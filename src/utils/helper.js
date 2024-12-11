import { isValid } from 'date-fns';


export function convertISOToLaravelDateTime(dateTime){
    dateTime = new Date(dateTime);
    // Check if the selected date is valid
    if (!dateTime || !isValid(new Date(dateTime))) {
        return {success: false, convertedDateTime: null};
    }

    const isoDateString = dateTime.toISOString();
    dateTime = isoDateString.replace('T', ' ').slice(0, 19);
    return {success: true, convertedDateTime: dateTime};
}