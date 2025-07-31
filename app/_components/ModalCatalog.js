"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function ModalCatalog({ item, imgSrc, open, onOpenChange }) {
  if (!item) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl dark:bg-gray-800">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{item.name}</DialogTitle>
        </DialogHeader>

        {item.image_url && (
          <div className="relative w-full h-64 mb-4">
            <Image
              src={imgSrc}
              alt={item.name}
              fill
              className="object-cover rounded-lg"
            />
          </div>
        )}

        <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
          {item.description && (
            <p>
              <strong>Description:</strong> {item.description}
            </p>
          )}
          {item.instructions && (
            <p>
              <strong>Instructions:</strong> {item.instructions}
            </p>
          )}
          {item.tips && (
            <p>
              <strong>Tips:</strong> {item.tips}
            </p>
          )}
          {item.equipment && (
            <p>
              <strong>Equipment:</strong> {item.equipment}
            </p>
          )}
          {item.difficulty && (
            <p>
              <strong>Difficulty:</strong> {item.difficulty}
            </p>
          )}
          {item.type && (
            <p>
              <strong>Type:</strong> {item.category}
            </p>
          )}
          {item.primary_muscle && (
            <p>
              <strong>Primary Muscle:</strong> {item.primary_muscle}
            </p>
          )}
          {item.secondary_muscles?.length > 0 && (
            <p>
              <strong>Secondary Muscles:</strong> {item.secondary_muscles}
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
