import axios from 'axios'
const activerUrl = "https://apex.oracle.com/pls/apex/mcarred/parrainage/electeur/creerCompte"
const parrainerUrl="https://apex.oracle.com/pls/apex/mcarred/parrainage/electeur/parrainer"
const verifierAuthUrl="https://apex.oracle.com/pls/apex/mcarred/parrainage/electeur/auth"
const validerParrainageUrl="https://apex.oracle.com/pls/apex/mcarred/parrainage/electeur/validerParrainage/"
const verifierParrainageUrl = "https://apex.oracle.com/pls/apex/mcarred/parrainage/electeur/veriiferParrainage"
const activerCompte = async (data)=>{
            return await axios.post(activerUrl,data)  
}

const creerCompte = async (data,idElecteur)=>{
    return await axios.post(activerUrl+'/'+idElecteur,data)  
}
const verifierActivation = async (data)=>{
    return await axios.post(parrainerUrl,data)  
}
const verifierAuthentification = async (data)=>{
    return await axios.post(verifierAuthUrl,data)  
}
const envoiCodeValidation = async (data,idCandidat)=>{
    return await axios.post(parrainerUrl+"/"+idCandidat,data)  
}
const validerParrainage = async (data,idCandidat)=>{
    return await axios.post(validerParrainageUrl+"/"+idCandidat,data)  
}
const verifierParrainage = async (data)=>{
    console.log("DATA",data)
    console.log("CODE VERIFICATION "+data?.codeVerification)
    console.log("NUM ELECTEUR "+data?.numElecteur)
    return await axios.post(verifierParrainageUrl,data)  
}

export {activerCompte,creerCompte,verifierActivation,verifierAuthentification,envoiCodeValidation,validerParrainage,verifierParrainage};