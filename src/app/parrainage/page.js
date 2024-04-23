"use client";
import { envoiCodeValidation } from "@/lib/query";
import { useState } from "react";
import { FaKey, FaRegUser } from "react-icons/fa";

var response;
export default function Parrainage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const infosParrainage = JSON.parse(localStorage.getItem("infosParrainage"));
  const candidats = JSON.parse(
    localStorage.getItem("infosParrainage")
  )?.candidats;
  const [selectedCandidat,setSelectedCandidat] = useState({})

  const [inputValues, setInputValues] = useState({
    numElecteur: "",
    cin: "",
    codeAuth: "",
  });
  const [error, setError] = useState(false);

  const handleInputChange = (field, value) => {
    setInputValues((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  const handleParrainage = async (candidat) => {
    console.log(candidat)
    setSelectedCandidat(candidat)
    if (inputValues?.codeAuth=="") {
      setIsModalOpen(true)
      return;
    }
    try {
      //Verification authentification
      response = await envoiCodeValidation({
        numElecteur: infosParrainage.numElecteur,
        codeAuth: inputValues?.codeAuth,
      },candidat?.ID);

      if (response?.data?.status != 200) {
        //Cas d'erreur
        setError(true);
      } else {
        //Cas de succes
        console.log("REPONSE PARRAINAGE",response?.data)

        setError(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <main className="flex min-h-screen flex-col items-center py-8 bg-cover relative bg-gradient-to-br from-green-50 to-cyan-100">
      {isModalOpen && (
        <div
          className="fixed inset-0 z-20 bg-black bg-opacity-50 backdrop-blur-lg"
          onClick={() => setIsModalOpen(!isModalOpen)}
        >
          <div
            className="flex justify-center items-center min-h-screen"
            onClick={(e) => e.stopPropagation()} // Stop event bubbling
          >
            <div className="bg-white p-6 rounded-xl shadow-lg max-w-sm text-center flex flex-col gap-4">
              <p className="text-xl font-bold text-[#19897F]">
                Vous souhaitez parrainer le candidat {candidat?.PRENOM + candidat?.NOM}
                Envoi du code de validation sur votre email
              </p>
              {/* Code de vérification */}
              <div className="flex flex-col gap-2">
                {/* CODE AUTH */}
                <label className="input input-bordered flex items-center gap-2">
                  <FaKey size={14} color="#444" />
                  <input
                    type={"text"}
                    value={inputValues?.codeAuth}
                    onChange={(e) =>
                      handleInputChange("codeAuth", e.target.value)
                    }
                    className="grow text-sm md:text-base"
                    placeholder="Code d'authentification"
                  />
                </label>
              </div>
              <div className="flex flex-col gap-2">
                <button
                  className=" px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-800"
                  onClick={() => handleParrainage}
                >
                  Envoyer code de validation
                </button>
                <button
                  className=" px-4 py-2 bg-red-600 text-white rounded hover:bg-red-500"
                  onClick={() => setIsModalOpen(!isModalOpen)}
                >
                  Annuler
                </button>
              </div>
              {error && (
                <span className="text-red-600 text-sm">
                  Code auth incorrect
                </span>
              )}
            </div>
          </div>
        </div>
      )}
      <p className="title text-[#19897F] font-bold text-2xl w-full text-center">
        Qui souhaitez-vous parrainer ?
      </p>

      <div className="flex flex-wrap justify-center gap-6 mt-6">
        {candidats.map((candidat, index) => (
          <div
            key={index}
            className="card bg-white p-6 rounded-2xl shadow-lg flex flex-col items-center text-center hover:shadow-xl hover:-translate-y-2 transition-all "
          >
            <FaRegUser size={48} className="text-gray-400" />{" "}
            {/* Icone pour le profil */}
            <p className="font-bold text-lg">
              {candidat.PRENOM} {candidat.NOM}
            </p>
            <p className="text-gray-500">
              Né(e) le: {candidat.DATENAISSANCE?.split("T")?.[0]}
            </p>
            <a className="text-blue-700 font-bold text-xs  px-2 py-1 bg-gray-300 rounded-full" >
               {candidat.SITEWEB?.split("T")?.[0]}
            </a>
            <button
              className="px-4 py-2 mt-4 bg-[#19897F] text-white rounded-lg hover:bg-[#106f5f] transition-all"
              onClick={()=>handleParrainage(candidat)}
            >
              Parrainer
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}
