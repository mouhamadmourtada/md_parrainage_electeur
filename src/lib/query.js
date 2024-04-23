import axios from 'axios'
const activerUrl = "https://apex.oracle.com/pls/apex/mcarred/parrainage/electeur/creerCompte"
const parrainerUrl="https://apex.oracle.com/pls/apex/mcarred/parrainage/electeur/parrainer"
const verifierAuthUrl="https://apex.oracle.com/pls/apex/mcarred/parrainage/electeur/auth"
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

export {activerCompte,creerCompte,verifierActivation,verifierAuthentification,envoiCodeValidation};