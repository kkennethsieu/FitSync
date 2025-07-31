"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import ModalCatalog from "@/app/_components/ModalCatalog";

function RecommendedWorkout({ workout }) {
  const { name = "Workout", image_url } = workout;
  const [openModal, setOpenModal] = useState(false);

  const [imgSrc, setImgSrc] = useState("/images/placeholder.jpg");

  useEffect(() => {
    if (image_url && process.env.NEXT_PUBLIC_SUPABASE_IMG_URL) {
      setImgSrc(`${process.env.NEXT_PUBLIC_SUPABASE_IMG_URL}/${image_url}`);
    }
  }, [image_url]);

  return (
    <>
      <div
        className="relative w-full h-[150px] rounded-xl overflow-hidden shadow-md group"
        onClick={() => setOpenModal(true)}
      >
        <Image
          src={imgSrc}
          alt={`Recommended workout: ${name}`}
          fill
          className="object-cover transition-all duration-300 brightness-75 group-hover:brightness-90"
          sizes="(max-width: 768px) 100vw, 33vw"
          priority
        />
        <div className="absolute inset-0 flex items-center justify-center px-4 text-center">
          <h5 className="text-lg font-semibold text-white drop-shadow-md">
            {name}
          </h5>
        </div>
      </div>
      {openModal && (
        <ModalCatalog
          item={workout}
          imgSrc={imgSrc}
          open={openModal}
          onOpenChange={setOpenModal}
        />
      )}
    </>
  );
}

export default RecommendedWorkout;
