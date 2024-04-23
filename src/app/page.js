"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaIdCardAlt, FaKey, FaKeybase, FaRegIdCard } from "react-icons/fa";
import gsap from "gsap";
import { verifierActivation, verifierAuthentification } from "@/lib/query";
import { useRouter } from "next/navigation";

var tl = gsap.timeline();
var response;
export default function Home() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isParrainerModalOpen, setIsParrainerModalOpen] = useState(false);
  const [nextStep, setNextStep] = useState(false);
  const [verifiedElecteur,setVerifiedElecteur] = useState({})
  const [inputValues, setInputValues] = useState({
    numElecteur: "",
    cin: "",
    codeAuth:""
  });
  const [error, setError] = useState(false)

  const handleInputChange = (field, value) => {
    setInputValues((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  //handle verification
  const handleVerification = async () => {
    // Envoi du formulaire complet
    try {
      //Verification authentification
      if (inputValues?.codeAuth != "") {
        response = await verifierAuthentification({numElecteur:inputValues?.numElecteur,codeAuth:inputValues?.codeAuth});
        
        if (response?.data?.status != 200) {
          //Cas d'erreur
          setError(true);
        } else {
          //Cas de succes: passer au formulaire suivant
          localStorage.setItem("infosParrainage",JSON.stringify({...response?.data,inputValues}))
          router.push("/parrainage")
          setError(false);
        }
      }else{
      //Verification authentification

        response = await verifierActivation({numElecteur:inputValues?.numElecteur,cin:inputValues?.cin});
        if (response?.data?.status != 200) {
          //Cas d'erreur
          setError(true);
        } else {
          //Cas de succes: passer au formulaire suivant
          setVerifiedElecteur(response?.data)
          setNextStep(true)
          setError(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
  //Animation
  useEffect(() => {
    const tl = gsap.timeline();
    tl.fromTo(
      ".box",
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.7, ease: "ease.in" }
    );
    tl.fromTo(
      ".title",
      { opacity: 0 },
      { opacity: 1, duration: 0.7, ease: "" }
    );
    tl.fromTo(
      ".click",
      {
        opacity: 0,
      },
      {
        opacity: 1,
        duration: 0.7,
        stagger: 0.8, // Décalage de 0,2 secondes entre chaque animation
      }
    );
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center py-8 bg-[url('/bg-hero.jpg')] bg-cover relative">
      {/* Modal Background Blurry */}
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
                Vérifier votre parrainage
              </p>
              {/* Code de vérification */}
              <div className="flex flex-col gap-2">
                <label className="input input-bordered flex items-center gap-2">
                  <FaIdCardAlt size={14} color="#444" />

                  <input
                    type="text"
                    style={{ userSelect: "none" }}
                    className="grow text-sm md:text-base"
                    placeholder="Code de verification"
                  />
                </label>
                {/* Carte electeur */}
                <label className="input input-bordered flex items-center gap-2">
                  <FaKey size={14} color="#444" />
                  <input
                    type="text"
                    // readOnly={showAdditionalInputs}
                    style={{ userSelect: "none" }}
                    className="grow text-sm md:text-base"
                    placeholder="N° Carte Electeur"
                  />
                </label>
              </div>
              <div className="flex flex-col gap-2">
                <button
                  className=" px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-800"
                  onClick={() => setIsModalOpen(!isModalOpen)}
                >
                  Verifier
                </button>
                <button
                  className=" px-4 py-2 bg-red-600 text-white rounded hover:bg-red-500"
                  onClick={() => setIsModalOpen(!isModalOpen)}
                >
                  Annuler
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Modal pour le parrainage*/}
      {isParrainerModalOpen && (
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
                Parrainer mon Candidat
              </p>
          {!nextStep &&    <div className="flex flex-col gap-2">
                {/* Carte electeur */}
                <label className="input input-bordered flex items-center gap-2">
                  <FaKey size={14} color="#444" />
                  <input
                    type="text"
                    value={inputValues?.numElecteur}
                    onChange={(e) =>
                      handleInputChange("numElecteur", e.target.value)
                    }
                    style={{ userSelect: "none" }}
                    className="grow text-sm md:text-base"
                    placeholder="N° Carte Electeur"
                  />
                </label>
                {/* CIN */}
                <label className="input input-bordered flex items-center gap-2">
                  <FaRegIdCard size={14} color="#444" />
                  <input
                    type={"text"}
                    value={inputValues?.cin}
                    onChange={(e) => handleInputChange("cin", e.target.value)}
                    className="grow text-sm md:text-base"
                    placeholder="N° Carte d'identité (NIN)"
                  />
                </label>
              </div>}

              {/* FORMULAIRE SUIVANTE */}
        {
          nextStep &&   <div className="flex flex-col gap-2">
          
          {/* CODE AUTH */}
          <label className="input input-bordered flex items-center gap-2">
            <FaKey size={14} color="#444" />
            <input
              type={"text"}
              value={inputValues?.codeAuth}
              onChange={(e) => handleInputChange("codeAuth", e.target.value)}
              className="grow text-sm md:text-base"
              placeholder="Code d'authentification"
            />
          </label>
        </div>
        }

        {error && (
    <span className="text-red-600 text-sm">
      Votre compte n'est pas activé
    </span>
  )}

              <div className="flex flex-col gap-2">
                <button
                  className=" px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-800"
                  onClick={handleVerification}
                >
                  Valider
                </button>
                <button
                  className=" px-4 py-2 bg-red-600 text-white rounded hover:bg-red-500"
                  onClick={() => setIsParrainerModalOpen(!isParrainerModalOpen)}
                >
                  Annuler
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className=" box flex flex-col gap-8 my-auto bg-[#ffffff99] p-8 rounded-3xl backdrop-blur-sm max-w-[80%] z-10">
        <p className="title font-bold text-2xl w-full text-center">
          Bienvenue sur <span className="text-[#19897F]">Sama Parrain !</span>
        </p>

        <Link
          className="click bg-[#19897F] text-white text-center py-4 px-6 md:text-lg text-sm rounded hover:bg-transparent hover:border hover:border-[#19897F] hover:text-[#19897F] hover:rounded-3xl transition-all duration-600"
          onClick={() => console.log("Activer compte")}
          href="/activation"
        >
          Activer compte
        </Link>

        <button
          className="click bg-[#19897F] text-white text-center py-4 px-6 md:text-lg text-sm rounded hover:bg-transparent hover:border hover:border-[#19897F] hover:text-[#19897F] hover:rounded-3xl transition-all duration-600"
          onClick={() => setIsParrainerModalOpen(!isModalOpen)}
        >
          Parrainer Mon Candidat
        </button>

        <button
          className="click bg-[#19897F] text-white text-center py-4 px-6 md:text-lg text-sm rounded hover:bg-transparent hover:border hover:border-[#19897F] hover:text-[#19897F] hover:rounded-3xl transition-all duration-600"
          onClick={() => setIsModalOpen(!isModalOpen)}
        >
          Vérifier Parrainage
        </button>
      </div>
    </main>
  );
}
