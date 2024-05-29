const validation = {
    isEmpty(value){
        return (
            value === null ||
            value === undefined ||
            (typeof value === 'string' && value.trim() === '')
        );
    },

    isURLValid(value){
        // url = /^(https?:\/\/)/.test(value.substring(0, 8));
        console.log('url value');
        console.log(value);
        const regex = /^(ftp|http|https):\/\/[^ "]+$/;
        return regex.test(value);
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
            if(validation.isEmpty(ACCEPTED_FILE_TYPE[fileType])){
                validationSuccess = false;
                return; 
            }
        });
        return validationSuccess;
    }
};

export default validation;

// export function isEmpty(value){
//     return (
//         value === null ||
//         value === undefined ||
//         (typeof value === 'string' && value.trim() === '')
//     );
// }

// export function isEmail(value){
//     return value.includes('@');
// }