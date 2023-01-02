export const loadState = () => {
    try{
        const serializedState = localStorage.getItem('state');
        if(serializedState){

            var temp = JSON.parse(serializedState);

            return temp
        }
        else {
            return undefined;
        }
    }
    catch(error){
        return error;
    }
}

export const saveState = (state) => {
    try{
        const serializedState = JSON.stringify(state);
        localStorage.setItem('state', serializedState);
    }catch(err){
        
    }
}  