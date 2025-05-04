
export function getLocation(){
    return new Promise((resolve,reject)=>{
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition((position)=>{
                console.log("succesful fetch");
                console.log("====");
                resolve([position.coords.latitude, position.coords.longitude]);
            }, (error)=>{
                console.log("oopsie");
                reject(error);
            });
        } else {
            console.log("error");
            reject("Something happened lmao");
        }
    });
}