"use client";

import { activerCompte, creerCompte } from "@/lib/query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  FaPhoneAlt,
  FaIdCardAlt,
  FaRegIdCard,
  FaMailBulk,
} from "react-icons/fa";

export default function Activation() {
  const router = useRouter();
  const [showAdditionalInputs, setShowAdditionalInputs] = useState(false);
  const [error, setError] = useState(false);
  const [electeur, setElecteur] = useState({});

  const [inputValues, setInputValues] = useState({
    numElecteur: "",
    cin: "",
    nom: "",
    email: "",
    phoneNumber: "",
  });

  const handleInputChange = (field, value) => {
    setInputValues((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleActivation = async () => {
    if (showAdditionalInputs) {
      // Envoi du formulaire complet
      try {
        const response = await creerCompte(inputValues,electeur?.ID);
        console.log("REPONSE FINALE", response);
        if (response?.data?.status === 400) {
          //Cas d'erreur

          setError(true);
        } else {
          //Cas de succes
          router.push("/")
          setError(false);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const response = await activerCompte({
          numElecteur: inputValues?.numElecteur,
          cin: inputValues?.cin,
          nom: inputValues?.nom,
        });
        if (response?.data?.status === 400) {
          //Cas d'erreur
          setError(true);
        } else {
          //Cas de succes
          console.log("ELECTEUR" + JSON.stringify(response?.data?.electeur));
          setElecteur(response?.data?.electeur);
          setShowAdditionalInputs(true);
          setError(false);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="py-4 px-4 flex flex-col h-screen bg-white text-xl font-bold bg-gradient-to-br from-green-100 to-cyan-200">
      <button
        className="hover:cursor-pointer self-start text-sm sm:text-xl"
        onClick={() => router.back()}
      >
        Retour
      </button>

      <div className="self-center my-auto flex flex-col gap-6 rounded-3xl bg-[#ffffff99] p-8 backdrop-blur-sm max-w-[80%]">
        <p className="font-bold text-sm sm:text-2xl w-full text-center">
          Activation du compte
        </p>

        {/* Carte electeur */}
        <label className="input input-bordered flex items-center gap-2">
          <FaIdCardAlt size={14} color="#444" />
          <input
            type={showAdditionalInputs ? "button" : "text"}
            // readOnly={showAdditionalInputs}
            value={inputValues.numElecteur}
            onChange={(e) => handleInputChange("numElecteur", e.target.value)}
            style={{ userSelect: "none" }}
            className="grow text-sm md:text-base"
            placeholder="N° Carte Electeur"
          />
        </label>
        {/* Carte d'identité */}

        <label className="input input-bordered flex items-center gap-2">
          <FaRegIdCard size={14} color="#444" />
          <input
            type={showAdditionalInputs ? "button" : "text"}
            readOnly={showAdditionalInputs}
            value={inputValues?.cin}
            onChange={(e) => handleInputChange("cin", e.target.value)}
            className="grow text-sm md:text-base"
            placeholder="N° Carte d'identité (NIN)"
          />
        </label>

        <label className="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0 c.-22-.578-.254 1.139.872 1.139h9.47Z" />
          </svg>
          <input
            type={showAdditionalInputs ? "button" : "text"}
            readOnly={showAdditionalInputs}
            value={inputValues?.nom}
            onChange={(e) => handleInputChange("nom", e.target.value)}
            className="grow text-sm md:text-base"
            placeholder="Nom de Famille"
          />
        </label>
        {error && (
          <span className="text-red-600 text-sm">
            Vous n'etes pas dans la liste electeur
          </span>
        )}

        {showAdditionalInputs && (
          <>
            {/* Adresse Email */}
            <label className="input input-bordered flex items-center gap-2">
              <FaMailBulk size={14} color="#444" />

              <input
                type="text"
                value={inputValues.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="grow text-sm md:text-base"
                placeholder="Adresse Email"
              />
            </label>

            {/* Numéro de téléphone */}
            <label class="input input-bordered flex items-center gap-2">
              <FaPhoneAlt size={14} color="#444" />
              <input
                type="text"
                value={inputValues.phoneNumber}
                onChange={(e) =>
                  handleInputChange("phoneNumber", e.target.value)
                }
                class="grow text-sm md:text-base"
                placeholder="Numéro de téléphone"
              />
            </label>
          </>
        )}

        <button
          className="btn bg-[#19897F] hover:bg-white hover:text-[#19897F] hover:border hover:border-[#19897F] text-white text-xl"
          onClick={handleActivation}
        >
          Activer
        </button>
      </div>
    </div>
  );
}
