import Swal from 'sweetalert2';
import DOMPurify from 'dompurify';

export const helperValidation = {
    sanitizeInput(input) {
        // DOMPurify is used to sanitize input if the input has any potential HTML content
        return DOMPurify.sanitize(input);
    },

    isString(value){
        return typeof value === 'string';
    },

    isValidMinLength(value, minLength) {
        if (!this.isString(value)) return false;
        return value.length >= minLength;
    },

    isValidMaxLength(value, maxLength) {
        if (!this.isString(value)) return false;
        return value.length <= maxLength;
    },

    /**
     * Validates if the string's length is within a specified range.
     * It checks if the input is a string, and if it meets both the minimum and maximum length constraints.
     * 
     * @param {string} str - The string to check.
     * @param {number} minLength - The minimum length.
     * @param {number} maxLength - The maximum length.
     * @returns {boolean} - `true` if the string is valid (it's a string and its length is within the range), `false` otherwise.
     */
    isValidateStringRange(value, minLength = 0, maxLength = 100) {
        return this.isString(value) && this.isValidMinLength(value, minLength) && this.isValidMaxLength(value, maxLength);
    },

    isEmpty(value){
        return (
            value === null ||
            value === undefined ||
            (typeof value === 'string' && value.trim() === '')
        );
    },

    isURLValid(value){
        try {
            const parseUrl = new URL(value);
            console.log(parseUrl.href);
        } catch (error) {
            return false;
        }
        return true;
    },

    isEmail(value){
        return value.includes('@');
    },

    isSelectedFile(value){
        let validationSuccess = true;
        if(!Array.isArray(value)){ // ensure value is array
            return false;
        }

        const ACCEPTED_FILE_TYPE= {
            'application/pdf': 'pdf',
        }

        value.forEach(fileType => {
            if(helperValidation.isEmpty(ACCEPTED_FILE_TYPE[fileType])){
                validationSuccess = false;
                return; 
            }
        });
        return validationSuccess;
    }
};

export function helperErrorPopUp({title, text}){
    return Swal.fire({
        title: title,
        text: text,
        icon: 'error',
        confirmButtonText: 'OK',
        customClass: {
            popup: 'custom-swal-color',
            content: 'custom-swal-color',
            confirmButton: 'custom-swal-color',
        },
    });
}
