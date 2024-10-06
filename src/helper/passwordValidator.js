
function passwordValidator(string){
    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if(string.length < 0){
        return false;
    }

    if(!regex.test(string)){
        return false;
    }

    return true;
}   

export default passwordValidator;