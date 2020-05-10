import axios from 'axios'


export async function listNasabahFunction (param,next){
    return new Promise (async (resolve)=>{

        //karena API di block oleh CORS jadi saya pake third party cors-anywhere
        axios.get('https://cors-anywhere.herokuapp.com/https://nextar.flip.id/frontend-test')
        .then((res)=>{
            resolve(res)
        })
        .catch((err)=>{
            resolve(err);
        })
    })
}
