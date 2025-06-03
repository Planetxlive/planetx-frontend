"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Search, Heart, Star, X } from "lucide-react";
import axios from "axios";
import BACKEND_URL from "@/lib/BACKEND_URL";

// Dummy Parking Data based on your parking schema
const DUMMY_GYMS = [
  {
    _id: "1",
    userId: "user1",
    spotNumber: "Fitness First Downtown",
    location: "1st Floor, Downtown Plaza, MG Road",
    type: "unisex", // can be 'unisex', 'men-only', 'women-only'
    isAvailable: true,
    hourlyRate: 200,
    size: "large", // can be 'small', 'medium', 'large'
    amenities: ["ac", "personal_trainer", "steam", "locker_room"],
    images: ["/gym1.jpg"],
    accessibility: {
      wheelchairAccessible: true,
      nearEntrance: true,
    },
    coordinates: {
      latitude: 19.076,
      longitude: 72.8777,
    },
    createdAt: new Date(),
    updatedAt: new Date(),
    reviews: [
      {
        _id: "r1",
        text: "Well-maintained gym with great trainers.",
        author: "Alice",
        stars: 4,
        createdAt: new Date(),
        user: { _id: "user1", name: "Alice" },
      },
      {
        _id: "r2",
        text: "Clean and spacious. Loved the steam room!",
        author: "Bob",
        stars: 5,
        createdAt: new Date(),
        user: { _id: "user2", name: "Bob" },
      },
    ],
    owner: {
      name: "Manager Rahul",
      mobile: "+91 12345 67890",
      whatsappMobile: "+91 12345 67890",
    },
  },
  {
    _id: "2",
    userId: "user2",
    spotNumber: "Muscle House Gym",
    location: "2nd Floor, Galaxy Mall, Andheri",
    type: "men-only",
    isAvailable: false,
    hourlyRate: 150,
    size: "medium",
    amenities: ["weights", "cardio", "locker_room"],
    images: ["/gym2.jpg"],
    accessibility: {
      wheelchairAccessible: false,
      nearEntrance: false,
    },
    coordinates: {
      latitude: 28.7041,
      longitude: 77.1025,
    },
    createdAt: new Date(),
    updatedAt: new Date(),
    reviews: [],
    owner: {
      name: "Owner Sameer",
      mobile: "+91 98765 43210",
      whatsappMobile: "+91 98765 43210",
    },
  },
  {
    _id: "3",
    userId: "user3",
    spotNumber: "Zen Fit Studio",
    location: "3rd Floor, Indiranagar Complex, Bangalore",
    type: "women-only",
    isAvailable: true,
    hourlyRate: 250,
    size: "small",
    amenities: ["yoga", "zumba", "ac", "locker_room"],
    images: ["/gym3.jpg"],
    accessibility: {
      wheelchairAccessible: true,
      nearEntrance: true,
    },
    coordinates: {
      latitude: 12.9716,
      longitude: 77.5946,
    },
    createdAt: new Date(),
    updatedAt: new Date(),
    reviews: [
      {
        _id: "r3",
        text: "Perfect for yoga and wellness. Peaceful ambiance.",
        author: "Charlie",
        stars: 5,
        createdAt: new Date(),
        user: { _id: "user3", name: "Charlie" },
      },
    ],
    owner: {
      name: "Owner Priya",
      mobile: "+91 11223 44556",
      whatsappMobile: "+91 11223 44556",
    },
  },
];

export default function ParkingDetailsPage() {
  const [parking, setParking] = useState(DUMMY_GYMS);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <section className="flex-1 p-4 sm:p-6 max-w-full bg-gray-50">
      {/* Search Header */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6 max-w-6xl mx-auto">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Search parking spots by location, type, or status"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
            aria-label="Search parking spots"
            className="pl-10 w-full bg-white border-gray-200 focus:border-teal-600 rounded-lg py-2 transition-all duration-200"
          />
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto">
        {loading ? (
          <div className="flex flex-col items-center py-12">
            <Loader2 className="h-12 w-12 text-teal-600 animate-spin" />
            <p className="mt-4 text-gray-600">Loading parking spots...</p>
          </div>
        ) : parking.length === 0 ? (
          <p className="text-center text-gray-600 py-12">
            {searchTerm
              ? `No parking spots found for "${searchTerm}". Try a different search term.`
              : "No parking spots available at the moment."}
          </p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-1">
            {parking.map((spot) => (
              <GymEntry key={spot._id} spot={spot} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function GymEntry({ spot }) {
  return (
    <article
      className="bg-white border border-gray-100 rounded-2xl p-4 flex flex-col sm:flex-row gap-4 shadow-sm hover:shadow-xl transition-all duration-300"
    >
      {/* Image */}
      <div className="relative w-full sm:w-72 h-48 sm:h-56 flex-shrink-0 rounded-xl overflow-hidden">
        <img
          src={spot.images?.[0] || "/default-parking.jpg"}
          alt={`Parking spot ${spot.spotNumber}`}
          className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
          loading="lazy"
        />
      </div>

      {/* Details */}
      <div className="flex-1 flex flex-col justify-between gap-2">
        <div>
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
            Spot {spot.spotNumber}
          </h3>
          <p className="text-xs sm:text-sm text-gray-500">
            {spot.location || "Location unknown"}
          </p>
          <div className="flex gap-2 mt-2 flex-wrap">
            <span className="text-xs text-teal-600 font-medium bg-teal-50 px-2 py-1 rounded-full capitalize">
              {spot.type || "Unknown"}
            </span>
            <span className="text-xs text-purple-600 font-medium bg-purple-50 px-2 py-1 rounded-full capitalize">
              Size: {spot.size || "Unknown"}
            </span>
            {spot.amenities.map((amenity, idx) => (
              <span
                key={idx}
                className="text-xs text-green-600 font-medium bg-green-50 px-2 py-1 rounded-full capitalize"
              >
                {amenity.replace(/_/g, " ")}
              </span>
            ))}
          </div>
        </div>
        <div className="mt-3 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <span
            className={`px-3 py-1 rounded-full text-sm font-semibold ${
              spot.isAvailable
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {spot.isAvailable ? "Active" : "Inactive"}
          </span>
          <Link href={`/gym/${spot._id}`}>
            <Button
              size="sm"
              className="rounded-full bg-teal-600 hover:bg-teal-700 transition-colors px-4"
            >
              View Details
            </Button>
          </Link>
        </div>
      </div>
    </article>
  );
}
