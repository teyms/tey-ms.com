import { useState } from 'react';
import '../App.css';

function Blog() {

    return (
        <>
            <div className="container">
                <div className="blog-header-container" style={{textAlign: 'center', padding: '20px'}}>
                    <h1>Your Blog Title</h1>
                </div>

                <div className="blog-body-container">                
                    <div className="column content-list">
                        <h2>Content List</h2>
                        <ul>
                            <li><a href="#">Item 1</a></li>
                            <li><a href="#">Item 2</a></li>
                            <li><a href="#">Item 3</a></li>
                            {/* <!-- Add more content list items as needed --> */}
                        </ul>
                    </div>

                    <div className="column blog-content">
                        <h2>Blog Post Title</h2>
                        <p>This is where your blog content goes. Write your article here.</p>
                    </div>

                    <div className="column ads-display">
                        <h2>Ads</h2>
                        <p>Ad content goes here. You can embed ads or display other promotional content.</p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Blog;
