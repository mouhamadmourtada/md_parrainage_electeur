"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaIdCardAlt, FaKey } from "react-icons/fa";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <main className="flex min-h-screen flex-col items-center py-8 bg-[url('/bg-hero.jpg')] bg-cover relative">
      {/* Modal Background Blurry */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-20 bg-black bg-opacity-50 backdrop-blur-lg"
          onClick={toggleModal}
        >
          <div
            className="flex justify-center items-center min-h-screen"
            onClick={(e) => e.stopPropagation()} // Stop event bubbling
          >
            <div className="bg-white p-6 rounded-xl shadow-lg max-w-sm text-center flex flex-col gap-4">
              <p className="text-xl font-bold text-[#19897F]">Vérifier votre parrainage</p>
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
                onClick={toggleModal}
                >
                Verifier
              </button>
              <button
                className=" px-4 py-2 bg-red-600 text-white rounded hover:bg-red-500"
                onClick={toggleModal}
                >
                Annuler
              </button>
                </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-8 my-auto bg-[#ffffff99] p-8 rounded-3xl backdrop-blur-sm max-w-[80%] z-10">
        <p className="font-bold text-2xl w-full text-center">
          Bienvenue sur <span className="text-[#19897F]">Sama Parrain !</span>
        </p>

        <Link
          className="bg-[#19897F] text-white text-center py-4 px-6 md:text-lg text-sm rounded hover:bg-transparent hover:border hover:border-[#19897F] hover:text-[#19897F] hover:rounded-3xl transition-all duration-600"
          onClick={() => console.log("Activer compte")}
          href="/activation"
        >
          Activer compte
        </Link>

        <Link
          className="bg-[#19897F] text-white text-center py-4 px-6 md:text-lg text-sm rounded hover:bg-transparent hover:border hover:border-[#19897F] hover:text-[#19897F] hover:rounded-3xl transition-all duration-600"
          onClick={() => console.log("Parrainer mon Candidat")}
          href=""
        >
          Parrainer Mon Candidat
        </Link>

        <button
          className="bg-[#19897F] text-white text-center py-4 px-6 md:text-lg text-sm rounded hover:bg-transparent hover:border hover:border-[#19897F] hover:text-[#19897F] hover:rounded-3xl transition-all duration-600"
          onClick={toggleModal}
        >
          Vérifier Parrainage
        </button>
      </div>
    </main>
  );
}
