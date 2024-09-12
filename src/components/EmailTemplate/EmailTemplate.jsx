import { useState, useEffect, useRef } from 'react';

import parse from 'html-react-parser';
// import emailMothersDay from './emailHTML/mothers_day.html'; // Importing the HTML file
import emailRaw_mothers_day from './emailHTML/mothers_day.html?raw'; 
import emailRaw_restaurant from './emailHTML/restaurant.html?raw'; 
import emailRaw_real_estate from './emailHTML/real_estate.html?raw'; 
import emailRaw_vehicle from './emailHTML/vehicle.html?raw'; 
import emailRaw_parcel_tracking from './emailHTML/parcel_tracking.html?raw'; 
import './emailTemplate.css';

function ParsedHtmlContent({htmlContent}) {
    return <div>{parse(htmlContent)}</div>;
}
const EMAIL_TEMPLATES = {
    mothers_day     : emailRaw_mothers_day,
    restaurant      : emailRaw_restaurant,
    real_estate     : emailRaw_real_estate,
    vehicle         : emailRaw_vehicle,
    parcel_tracking : emailRaw_parcel_tracking
}

function EmailTemplate() {
    const iframe_ref = useRef();
    const iframeBox_ref = useRef();
    const grabber_ref = useRef();

    const [isGrabber, setIsGrabber] = useState(false);
    const [emailTemplateSelected, setEmailTemplateSelected] = useState(emailRaw_mothers_day);


    function onUpdateIframeUrl(emailTemplateType){
        if(iframe_ref.current){
            let result = EMAIL_TEMPLATES[emailTemplateType] || emailRaw_mothers_day;
            setEmailTemplateSelected(result);
        }
    }

    function onMouseDownGrabber(event){
        // this.isGrabber = true;
        setIsGrabber(() => true);
        // const element: HTMLElement = this.iframeRef.nativeElement;
        iframe_ref.current.style.pointerEvents = 'none';
    }
    
    function onMouseUpGrabber(event){
        // this.isGrabber = false;

        setIsGrabber(false);
        // const element: HTMLElement = this.iframeRef.nativeElement;
        // element.style.pointerEvents = 'auto';
        iframe_ref.current.style.pointerEvents = 'auto';
    }
    
    function onMouseMoveGrabber(event){
        if(isGrabber){
          if(event.type === 'mousemove'){
            event.preventDefault();
          }
          // const iframeElem: HTMLElement = this.iframeRef.nativeElement;
          // const iframeBoxElem: HTMLElement = this.iframeBoxRef.nativeElement;
          const rect = iframe_ref.current.getBoundingClientRect();

          //get clientX in diff eventslistener
          const clientX = (event.type === 'mousemove')? event.clientX: event.touches[0].clientX;

          iframe_ref.current.style.width = (clientX-rect.left).toString()+'px';
          iframeBox_ref.current.style.width = (clientX-rect.left).toString()+'px';
          // element.style.minWidth = (clientX-rect.left).toString()+'px';
    
        }
    }

    useEffect(() => {
        const handleMouseUp = (event) => onMouseUpGrabber(event);
        const handleMouseMove = (event) => onMouseMoveGrabber(event);
        const handleTouchEnd = (event) => onMouseUpGrabber(event);
        const handleTouchMove = (event) => onMouseMoveGrabber(event);
    
        window.addEventListener('mouseup', handleMouseUp);
        // window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('touchend', handleTouchEnd);
        // window.addEventListener('touchmove', handleTouchMove);

        // window.addEventListener('mouseup', (event) => onMouseUpGrabber(event));
        // window.addEventListener('mousemove', (event) => onMouseMoveGrabber(event));
        // window.addEventListener('touchend', (event) => onMouseUpGrabber(event));
        // window.addEventListener('touchmove', (event) => onMouseMoveGrabber(event));
    
        // Cleanup function to remove the event listeners
        return () => {
          window.removeEventListener('mouseup', handleMouseUp);
        //   window.removeEventListener('mousemove', handleMouseMove);
          window.removeEventListener('touchend', handleTouchEnd);
        //   window.removeEventListener('touchmove', handleTouchMove);
        };
      }, []);

      useEffect(() => {
        // Your code that updates isGrabber
        // Example: setIsGrabber(true);
    
        // Ensure onMouseMoveGrabber has access to the latest isGrabber value
        window.addEventListener('mousemove', onMouseMoveGrabber);
        window.addEventListener('touchmove', onMouseMoveGrabber);

    
        // Cleanup function to remove event listener
        return () => {
          window.removeEventListener('mousemove', onMouseMoveGrabber);
          window.removeEventListener('touchmove', onMouseMoveGrabber);
        };
      }, [isGrabber]); // Depend on isGrabber to capture the latest value

    return (
        <>
            <div className="email-title">
                <p>Html Email Template</p>
            </div>

            <div className="two-column-container">
                <div className="iframe-container">
                    <div className="iframe-box" ref={iframeBox_ref}>
                        <iframe id="iframe" className="iframe"  
                            ref={iframe_ref}
                            title="Email Content"
                            // srcDoc={emailRaw_mothers_day}
                            srcDoc={emailTemplateSelected}
                            style={{ width: '100%', height: '2230px', border: 'none' }}
                        ></iframe>
                    </div>

                    <div className={`grabber ${isGrabber ? 'onGrabber' : ''}`}
                        ref={grabber_ref}
                        onMouseDown={onMouseDownGrabber}
                        onTouchStart={onMouseDownGrabber}
                        // onMouseUp={onMouseUpGrabber}
                        // onMouseMove={onMouseMoveGrabber}
                        // onTouchEnd={onMouseUpGrabber}
                        // onTouchMove={onMouseMoveGrabber}
                    >
                    </div>
                </div>

                <div className="nav-list-email">
                    <div className="hint-container">
                        <p> Click and Drag the GREEN LINE to resize the Email Template</p>
                    </div>
                    <div className="btn-container">
                        <button onClick={() => onUpdateIframeUrl('mothers_day')}>     mothers day       </button>
                        <button onClick={() => onUpdateIframeUrl('restaurant')}>      restaurant        </button>
                        <button onClick={() => onUpdateIframeUrl('real_estate')}>     real estate       </button>
                        <button onClick={() => onUpdateIframeUrl('vehicle')}>         vehicle           </button>
                        <button onClick={() => onUpdateIframeUrl('parcel_tracking')}> parcel tracking   </button>
                    </div>
                </div>
            </div>
        </>
        );
}

export default EmailTemplate;