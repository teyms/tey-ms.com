import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    Form,
    useNavigate,
    useNavigation,
    useActionData,
    json,
    redirect,
    useParams
} from 'react-router-dom';
import Swal from 'sweetalert2';

import '../../App.css';
import { CodeBlock, CopyBlock, dracula } from 'react-code-blocks'; //https://react-code-block.netlify.app/usage#basic-example
// import { useCopyToClipboard } from 'react-use';
import { getBlogPost } from '../../store/blogPost-action';
import Loading from '../../components/Loader/Loading';
import { blogPostActions } from '../../store/blogPost-slide';

// function Blog() {
function BlogPost() {
    const slug = useSelector((state) => state.blogPost.slug);
    const title = useSelector((state) => state.blogPost.title);
    const content = useSelector((state) => state.blogPost.content);
    const apiCallStatus = useSelector((state) => state.blogPost.success);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const getSlug = useParams();

    const [contentJson, setContentJson] = useState([]);
    const [isLoading, setIsLoading] = useState(true);// default as loading, since it will redirect

    useEffect(() => {
        async function getBlogPostDetails(){
            await dispatch(getBlogPost(getSlug['*']));
        }
    
        try{
            setIsLoading(true);
            getBlogPostDetails();
    
        }catch{
            Swal.fire({
                title: 'ERROR!',
                text: "Something Went Wrong!",
                icon: 'error',
                confirmButtonText: 'OK',
                customClass: {
                    popup: 'custom-swal-color',
                    content: 'custom-swal-color',
                    confirmButton: 'custom-swal-color',
                },
            }).then((result) => {
                if (result.isConfirmed) {
                    // If the user clicks "OK", redirect to "/home"
                    return navigate('/blog');
                } else {
                    // If the user dismisses the dialog by clicking outside,
                    // also redirect to "/home"
                    return navigate('/blog');
                }
            });        
        }
        finally{
            setIsLoading(false);
            
        }
    }, [dispatch, getSlug]);


    useEffect(() => {
        if(apiCallStatus && content){
            let contentToJson = JSON.parse(content);
            setContentJson(contentToJson);
        }else if(!apiCallStatus && content === 'blogPost_notFound'){
            Swal.fire({
                title: 'ERROR!',
                text: 'Blog Post Not Found',
                icon: 'error',
                confirmButtonText: 'OK',
                customClass: {
                  popup: 'custom-swal-color',
                  content: 'custom-swal-color',
                  confirmButton: 'custom-swal-color',
                },
            }).then((result) => {
                    // reset
                dispatch(
                    blogPostActions.updateBlogPost({
                    content: '',
                    success: false,
                    })
                )
                if (result.isConfirmed) {
                  // If the user clicks "OK", redirect to "/home"
                  return navigate('/blog');
                } else {
                  // If the user dismisses the dialog by clicking outside,
                  // also redirect to "/home"
                  return navigate('/blog');
                }
            });
        }
    }, [content]);

    const renderComponent = (component) => {
        switch (component.name) {
            case 'CodeBlock':
                const code = atob(component.props.text).toString();
                return (
                    <CodeBlock
                        key={Math.random()} // Ensure unique key for each component
                        language={component.props.language}
                        text={code}
                        theme={component.props.theme === 'dracula'? dracula : dracula}
                        showLineNumbers={component.props.showLineNumbers ?? false}
                    />
                );
            case 'Image':
                return (
                    <img
                        key={Math.random()} // Ensure unique key for each component
                        src={component.props.src}
                        alt={component.props.alt}
                        style={{ maxWidth: '100%', height: 'auto' }}
                    />
                );
            // Add cases for other component types if needed
            default:
                return null;
        }
    };



    return (
        <>
            {isLoading && <Loading/>}
            <div className="container">
                <div className="blog-header-container" style={{textAlign: 'center', padding: '20px'}}>
                    {/* <h1>Your Blog Title</h1>*/}
                    {/* <h1>{title}</h1> */}
                    
                </div>

                <div className="blog-body-container">                
                    <div className="column content-list" style={{visibility:'hidden'}}>
                        <h2>Content List</h2>
                        <ul>
                            <li><a href="#">Item 1</a></li>
                            <li><a href="#">Item 2</a></li>
                            <li><a href="#">Item 3</a></li>
                            {/* <!-- Add more content list items as needed --> */}
                        </ul>
                    </div>

                    <div className="column blog-content">
                        
                        {/* <div dangerouslySetInnerHTML={{ __html: content }} /> */}


                        {contentJson && contentJson.map((item, index) => {
                            if (item.type === 'html') {
                                // return <div key={index} dangerouslySetInnerHTML={{ __html: item.content }} />;
                                return <div key={index} dangerouslySetInnerHTML={{ __html: atob(item.content) }} />;
                            }
                            if (item.type === 'component') {
                                return renderComponent(item);
                            }
                            return null;
                        })}
                        
                    </div>

                    <div className="column ads-display" style={{visibility:'hidden'}}>
                        <h2>Ads</h2>
                        <p>Ad content goes here. You can embed ads or display other promotional content.</p>
                    </div>
                </div>
            </div>
        </>
    );
}


export default BlogPost;
