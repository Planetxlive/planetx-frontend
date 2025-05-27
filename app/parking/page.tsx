"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";

// Dummy Parking Data based on your parking schema
const DUMMY_PARKING = [
    {
        _id: "1",
        userId: "user1",
        spotNumber: "A-101",
        location: "Building A, Floor 1",
        type: "standard",
        isAvailable: true,
        hourlyRate: 10,
        size: "medium",
        amenities: ["covered", "security_camera"],
        images: ["/parking1.jpg"],
        accessibility: { wheelchairAccessible: true, nearEntrance: false },
        coordinates: { latitude: 19.076, longitude: 72.8777 },
        createdAt: new Date(),
        updatedAt: new Date(),
        reviews: [
            { text: "Great spot, very convenient.", author: "Alice" },
            { text: "Easy access and clean surroundings.", author: "Bob" },
        ],
    },
    {
        _id: "2",
        userId: "user2",
        spotNumber: "B-205",
        location: "Building B, Floor 2",
        type: "electric",
        isAvailable: false,
        hourlyRate: 15,
        size: "compact",
        amenities: ["ev_charging", "covered"],
        images: ["/parking2.jpg"],
        accessibility: { wheelchairAccessible: false, nearEntrance: true },
        coordinates: { latitude: 28.7041, longitude: 77.1025 },
        createdAt: new Date(),
        updatedAt: new Date(),
        reviews: [],
    },
    {
        _id: "3",
        userId: "user3",
        spotNumber: "C-303",
        location: "Building C, Floor 3",
        type: "premium",
        isAvailable: true,
        hourlyRate: 20,
        size: "large",
        amenities: ["covered", "security_camera", "ev_charging"],
        images: ["/parking3.jpg"],
        accessibility: { wheelchairAccessible: true, nearEntrance: true },
        coordinates: { latitude: 12.9716, longitude: 77.5946 },
        createdAt: new Date(),
        updatedAt: new Date(),
        reviews: [
            { text: "Spacious spot with premium facilities.", author: "Charlie" },
        ],
    },
];

export default function ParkingDetailsPage() {
    const { id } = useParams();
    const parking = DUMMY_PARKING.find((p) => p._id === id);
    const [showReviews, setShowReviews] = useState(false);

    // If no matching parking spot is found, render the dummy cards view
    if (!parking) {
        return (
            <div className="max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen">
                <h2 className="text-3xl font-bold mb-6 text-center">
                    Parking spot not found. Showing available dummy data:
                </h2>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {DUMMY_PARKING.map((spot) => (
                        <article
                            key={spot._id}
                            className="bg-white rounded-xl shadow-md p-6 flex flex-col gap-4 hover:shadow-xl transition-all duration-300"
                        >
                            {/* Image Section */}
                            <div className="rounded-xl border p-4">
                                <img
                                    src={spot.images[0] || "/default-parking.jpg"}
                                    alt={`Parking Spot ${spot.spotNumber}`}
                                    className="w-full h-40 object-cover rounded-xl"
                                />
                            </div>
                            {/* Details Section */}
                            <div>
                                <h2 className="text-xl font-bold mb-1">
                                    Spot {spot.spotNumber}
                                </h2>
                                <p className="text-gray-600 mb-1">
                                    <span className="font-medium">Location:</span> {spot.location}
                                </p>
                                <p className="text-gray-600 mb-1">
                                    <span className="font-medium">Type:</span>{" "}
                                    {spot.type.charAt(0).toUpperCase() + spot.type.slice(1)}
                                </p>
                                {/* Active / Inactive Tag */}
                                <p>
                                    <span
                                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                            spot.isAvailable
                                                ? "bg-green-100 text-green-800"
                                                : "bg-red-100 text-red-800"
                                        }`}
                                    >
                                        {spot.isAvailable ? "Active" : "Inactive"}
                                    </span>
                                </p>
                            </div>
                            {/* View Details Button */}
                            <Link href={`/parking/${spot._id}`}>
                                <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                                    View Details
                                </Button>
                            </Link>
                        </article>
                    ))}
                </div>
            </div>
        );
    }

    // Normal detailed view if a parking spot is found
    return (
        <div className="max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen">
            {/* Main container */}
            <div className="bg-white rounded-xl shadow-md p-6 space-y-6">
                {/* Picture Section */}
                <div className="rounded-xl border p-4">
                    <img
                        src={parking.images[0] || "/default-parking.jpg"}
                        alt={`Parking Spot ${parking.spotNumber}`}
                        className="w-full h-64 object-cover rounded-xl"
                    />
                </div>

                {/* Parking Details Section */}
                <div className="rounded-xl border p-6">
                    <h2 className="text-3xl font-bold mb-4">Spot {parking.spotNumber}</h2>
                    <p className="mb-3 text-gray-600">
                        <span className="font-medium">Location:</span> {parking.location}
                    </p>
                    <p className="mb-3">
                        <span className="font-medium">Type:</span>{" "}
                        {parking.type.charAt(0).toUpperCase() + parking.type.slice(1)}
                    </p>
                    <p className="mb-3">
                        <span className="font-medium">Hourly Rate:</span> ${parking.hourlyRate}
                    </p>
                    <p className="mb-3">
                        <span className="font-medium">Size:</span>{" "}
                        {parking.size.charAt(0).toUpperCase() + parking.size.slice(1)}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-4">
                        {parking.amenities.map((amenity, index) => (
                            <span
                                key={index}
                                className="bg-gray-100 text-gray-800 text-xs px-3 py-1.5 rounded-full font-medium"
                            >
                                {amenity.charAt(0).toUpperCase() + amenity.slice(1)}
                            </span>
                        ))}
                    </div>
                    {/* Active / Inactive Tag */}
                    <div className="mt-4">
                        <span
                            className={`px-3 py-1 rounded-full text-sm font-semibold ${
                                parking.isAvailable
                                    ? "bg-green-100 text-green-800"
                                    : "bg-red-100 text-red-800"
                            }`}
                        >
                            {parking.isAvailable ? "Active" : "Inactive"}
                        </span>
                    </div>
                </div>

                {/* Accessibility Section */}
                <div className="rounded-xl border p-6">
                    <h3 className="text-lg font-semibold mb-4">Accessibility</h3>
                    <div className="flex gap-4">
                        <div className="flex-1">
                            <p className="text-gray-600">
                                <span className="font-medium">Wheelchair Accessible:</span>{" "}
                                {parking.accessibility.wheelchairAccessible ? "Yes" : "No"}
                            </p>
                        </div>
                        <div className="flex-1">
                            <p className="text-gray-600">
                                <span className="font-medium">Near Entrance:</span>{" "}
                                {parking.accessibility.nearEntrance ? "Yes" : "No"}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Map Section */}
                <div className="rounded-xl border p-6">
                    <h3 className="text-lg font-semibold mb-4">Location on Map</h3>
                    <div className="h-64 rounded-xl overflow-hidden">
                        {/* Replace with actual map component in real implementation */}
                        <img
                            src={`https://maps.googleapis.com/maps/api/staticmap?center=${parking.coordinates.latitude},${parking.coordinates.longitude}&zoom=15&size=600x300&maptype=roadmap&markers=color:red%7Clabel:P%7C${parking.coordinates.latitude},${parking.coordinates.longitude}&key=YOUR_API_KEY`}
                            alt="Map Location"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>

                {/* Reviews Section */}
                <div className="rounded-xl border p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold">Reviews</h3>
                        <button
                            onClick={() => setShowReviews((prev) => !prev)}
                            className="text-purple-600 hover:underline"
                        >
                            {showReviews ? "Hide Reviews" : "Show Reviews"}
                        </button>
                    </div>
                    {showReviews && (
                        <div className="space-y-4">
                            {parking.reviews.length === 0 ? (
                                <p className="text-gray-500 text-sm">No reviews yet.</p>
                            ) : (
                                parking.reviews.map((review, index) => (
                                    <div
                                        key={index}
                                        className="p-4 bg-gray-50 rounded-lg shadow-sm border"
                                    >
                                        <p className="text-gray-800 font-medium">{review.author}</p>
                                        <p className="text-gray-600 text-sm">{review.text}</p>
                                    </div>
                                ))
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}