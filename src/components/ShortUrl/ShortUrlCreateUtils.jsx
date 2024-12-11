import { helperValidation, helperErrorPopUp } from '../../utils/validation'
import { convertISOToLaravelDateTime } from '../../utils/helper'
import { isValid } from 'date-fns';

const VALIDATION_FAILED = {success:false};
export function validateUrl(url){
    
    if(helperValidation.isEmpty(url)){ helperErrorPopUp({title: 'ERROR!',  text: "URL/LINK cannot be empty!"}); return VALIDATION_FAILED; }
    // const urlPattern = /((((https?|ftps?|gopher|telnet|nntp):\/\/)|(mailto:|news:))(%[0-9A-Fa-f]{2}|[-()_.!~*';/?:@&=+$,A-Za-z0-9])+)([).!';/?:,][[:blank:|:blank:]])?$/;
    // const urlPattern = /^(?:(https?|ftps?|gopher|telnet|nntp):\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[^\s]*)?$/;
    // const urlPattern = /^(?:(https?|ftps?|gopher|telnet|nntp):\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\:[0-9]+)?(\/[^\s]*)?$/;
    // const urlPattern = /^(?:(https?|ftps?|gopher|telnet|nntp):\/\/)?(www\.)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[^\s]*)?$/;
    
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = 'https://' + url;
    }

    // if(!urlPattern.test(url)){
    //   return { success: false };
    // }

    if(!helperValidation.isURLValid(url)) { helperErrorPopUp({title: 'ERROR!',  text: "Invalid URL/LINK!"}); return VALIDATION_FAILED; }

    return {url: url, success: true};
}

export function validateCustomPath(customPath, shortUrlPath){
    const [ MIN_CHAR, MAX_CHAR ] = [ 8, 50 ];
    if(helperValidation.isEmpty(shortUrlPath)){ helperErrorPopUp({title: 'ERROR!',  text: "You must first create your unique code"}); return VALIDATION_FAILED; }
    if(helperValidation.isEmpty(customPath)){ helperErrorPopUp({title: 'ERROR!',  text: "Custom Path cannot be empty"}); return VALIDATION_FAILED; }
    if(!helperValidation.isValidateStringRange(customPath, MIN_CHAR, MAX_CHAR)){ helperErrorPopUp({title: 'ERROR!',  text: `Custom Path must include min ${MIN_CHAR} chars and max ${MAX_CHAR} chars`}); return VALIDATION_FAILED; }
    if(customPath.includes('/') || customPath.includes('\\')){ helperErrorPopUp({title: 'ERROR!',  text: "Custom Path cannot include characters '/' or '\\'"}); return VALIDATION_FAILED; }
    const fullShortedUrl = `${import.meta.env.VITE_SELF_URL}/shorturl/${shortUrlPath}/${customPath}`;
    if(!helperValidation.isURLValid(fullShortedUrl)) { helperErrorPopUp({title: 'ERROR!',  text: "Custom Path cannot include symbol characters like like <, >, #, %, {, }, [, ], etc."}); return VALIDATION_FAILED; }
    return {customPath: helperValidation.sanitizeInput(customPath), success: true};
}
export function validateTitle(title){
    const [ MIN_CHAR, MAX_CHAR ] = [ 0, 30 ];
    // if(helperValidation.isEmpty(title)){ helperErrorPopUp({title: 'ERROR!',  text: "Title cannot be empty"}); return VALIDATION_FAILED; }
    if(!helperValidation.isValidateStringRange(title, MIN_CHAR, MAX_CHAR)){ helperErrorPopUp({title: 'ERROR!',  text: `Title must must be less than ${MAX_CHAR} characters`}); return VALIDATION_FAILED; }
    return {title: helperValidation.sanitizeInput(title), success: true};
}
export function validateDescription(description){
    const [ MIN_CHAR, MAX_CHAR ] = [ 0, 100 ];
    // if(helperValidation.isEmpty(description)){ helperErrorPopUp({title: 'ERROR!',  text: "Description cannot be empty"}); return VALIDATION_FAILED; }
    if(!helperValidation.isValidateStringRange(description, MIN_CHAR, MAX_CHAR)){ helperErrorPopUp({title: 'ERROR!',  text: `Description must must be less than ${MAX_CHAR} characters`}); return VALIDATION_FAILED; }
    return {description: helperValidation.sanitizeInput(description), success: true};    
}
export function validateExpiresAt(expiresAt){
    try{
        // Check if the selected date is valid
        if (!expiresAt || !isValid(new Date(expiresAt))) {
            helperErrorPopUp({title: 'ERROR!',  text: `Invalid date selected. Please choose a valid date and time.`});
            return VALIDATION_FAILED;
        }

        // Check if the selected date is not in the past (compared to the current date and time)
        const currentDate = new Date();
        currentDate.setMinutes(currentDate.getMinutes() + 10);
        if (new Date(expiresAt) < currentDate) {
            helperErrorPopUp({title: 'ERROR!',  text: `The selected date cannot be in the past.`});
            return VALIDATION_FAILED;
        }
        const {success, convertedDateTime} = convertISOToLaravelDateTime(expiresAt.toISOString());
        if(!success){
            helperErrorPopUp({title: 'ERROR!',  text: `Invalid DateTime format!`});
            return VALIDATION_FAILED;
        }
        expiresAt = convertedDateTime;
    }catch(ex){
        helperErrorPopUp({title: 'ERROR!',  text: `Invalid DateTime format!`});
        return VALIDATION_FAILED;
    }

    return {expires_at: helperValidation.sanitizeInput(expiresAt), success: true};
}