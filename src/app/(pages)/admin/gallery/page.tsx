"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UploadCloud, ImagePlus, CheckCircle, X, Trash2, Loader2 } from "lucide-react";

const fetchSections = async () => {
  const res = await fetch("/api/admin/gallery");
  const data = await res.json();
  return Array.isArray(data) ? data : [];
};

const GalleryAdminPage = () => {
  const [sections, setSections] = useState<
    {
      id: string;
      title: string;
      description?: string;
      photos: { id: string; imageUrl: string; caption?: string }[];
    }[]
  >([]);
  const [showSectionModal, setShowSectionModal] = useState(false);
  const [sectionTitle, setSectionTitle] = useState("");
  const [sectionDesc, setSectionDesc] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedSectionId, setSelectedSectionId] = useState<string | null>(
    null
  );
  const [photos, setPhotos] = useState<File[]>([]);
  const [uploadingPhotos, setUploadingPhotos] = useState(false);
  const [modalPhotos, setModalPhotos] = useState<File[]>([]); // Photos for the modal

  useEffect(() => {
    (async () => {
      setSections(await fetchSections());
    })();
  }, []);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCreateSection = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Create the section
      const res = await fetch("/api/admin/gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "section",
          title: sectionTitle,
          description: sectionDesc,
        }),
      });
      const data = await res.json();
      const newSectionId = data.id;

      // Upload photos to the new section
      if (modalPhotos.length > 0) {
        for (const photo of modalPhotos) {
          const formData = new FormData();
          formData.append("file", photo);
          const uploadRes = await fetch("/api/upload", {
            method: "POST",
            body: formData,
          });
          const uploadData = await uploadRes.json();
          const photoUrl = uploadData.data.secure_url;
          await fetch("/api/admin/gallery", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              type: "photo",
              sectionId: newSectionId,
              imageUrl: photoUrl,
            }),
          });
        }
      }

      setSections(await fetchSections());
      setShowSectionModal(false);
      setSectionTitle("");
      setSectionDesc("");
      setModalPhotos([]);
    } catch {
      alert("Error creating section");
    }
    setLoading(false);
  };

  const handlePhotoUpload = async () => {
    if (!selectedSectionId || photos.length === 0) return;
    setUploadingPhotos(true);
    for (const photo of photos) {
      const formData = new FormData();
      formData.append("file", photo);
      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const uploadData = await uploadRes.json();
      const photoUrl = uploadData.data.secure_url;
      await fetch("/api/admin/gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "photo",
          sectionId: selectedSectionId,
          imageUrl: photoUrl,
        }),
      });
    }
    setSections(await fetchSections());
    setPhotos([]);
    setUploadingPhotos(false);
  };

  const handleDeleteSection = async (sectionId: string) => {
    if (!confirm("Delete this section?")) return;
    await fetch("/api/admin/gallery", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "section", sectionId }),
    });
    setSections(await fetchSections());
  };

  const handleDeletePhoto = async (photoId: string) => {
    await fetch("/api/admin/gallery", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "photo", photoId }),
    });
    setSections(await fetchSections());
  };

  const removeModalPhoto = (index: number) => {
    setModalPhotos(modalPhotos.filter((_, i) => i !== index));
  };

  return (
    <main className="min-h-screen bg-[#f8f8fa] px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="max-w-5xl mx-auto"
      >
        <header className="mb-10 flex flex-col gap-2 items-center">
          <h1 className="text-4xl font-extrabold text-[#a50303] flex items-center gap-2">
            <ImagePlus className="w-8 h-8" /> Gallery Sections
          </h1>
          <p className="text-lg text-muted-foreground font-medium">
            Manage your sections and photos
          </p>
          <Button
            className="mt-4 rounded-full font-semibold bg-[#a50303] hover:bg-[#c70c0c] shadow text-white px-6 py-3 flex items-center gap-2"
            onClick={() => setShowSectionModal(true)}
            aria-label="Create Section"
          >
            <UploadCloud className="w-5 h-5" /> Create Section
          </Button>
        </header>

        <AnimatePresence>
          {showSectionModal && (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center"
              aria-modal="true"
              role="dialog"
            >
              <motion.div
                initial={{ y: 32, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 32, opacity: 0 }}
                className="bg-white rounded-2xl shadow-2xl border border-[#eaeaea] p-8 w-full max-w-md max-h-[80vh] overflow-y-auto"
              >
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-[#a50303] flex items-center gap-2">
                    <ImagePlus className="w-6 h-6" /> New Section
                  </h2>
                  <button
                    aria-label="Close"
                    className="rounded-full p-2 hover:bg-[#f8eaea] transition"
                    onClick={() => setShowSectionModal(false)}
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <form
                  onSubmit={handleCreateSection}
                  className="flex flex-col gap-4"
                >
                  <input
                    type="text"
                    placeholder="Section Title"
                    value={sectionTitle}
                    onChange={(e) => setSectionTitle(e.target.value)}
                    required
                    className="rounded-lg border border-[#eaeaea] px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-[#a50303] transition"
                    aria-label="Section Title"
                  />
                  <textarea
                    placeholder="Section Description"
                    value={sectionDesc}
                    onChange={(e) => setSectionDesc(e.target.value)}
                    className="rounded-lg border border-[#eaeaea] px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-[#a50303] transition"
                    aria-label="Section Description"
                  />
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Upload Photos{" "}
                    </label>
                    <input
                      ref={fileInputRef} // Add this ref
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={(e) => {
                        setModalPhotos(Array.from(e.target.files || []));
                        if (fileInputRef.current)
                          fileInputRef.current.value = ""; // Clear the input after selection
                      }}
                      className="rounded-lg border border-[#eaeaea] px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-[#a50303] transition w-full"
                      aria-label="Select Photos"
                    />
                    {modalPhotos.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {modalPhotos.map((photo, index) => (
                          <div key={index} className="relative">
                            <img
                              src={URL.createObjectURL(photo)}
                              alt={`Preview ${index + 1}`}
                              className="w-16 h-16 object-cover rounded-lg border border-[#eaeaea]"
                            />
                            <button
                              type="button"
                              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 text-xs"
                              onClick={() => removeModalPhoto(index)}
                              aria-label="Remove Photo"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                <Button
  type="submit"
  className="rounded-full font-semibold bg-[#a50303] hover:bg-[#c70c0c] transition-colors flex items-center justify-center gap-2 text-white"
  disabled={loading}
  aria-label="Create Section"
>
  {loading ? (
    <>
      <Loader2 className="w-5 h-5 animate-spin" /> Creating...
    </>
  ) : (
    <>
      <UploadCloud className="w-5 h-5" /> Create Section
    </>
  )}
</Button>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <section className="mt-8">
          {sections.length === 0 ? (
            <div className="py-12 text-center text-muted-foreground text-lg">
              No sections yet.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {sections.map((section) => (
                <motion.div
                  key={section.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-2xl shadow border border-[#eaeaea] p-6"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <span className="font-semibold text-lg text-[#a50303]">
                        {section.title}
                      </span>
                      <div className="text-sm text-muted-foreground">
                        {section.description}
                      </div>
                    </div>
                    <Button
                      className="rounded-full border border-[#a50303] text-[#a50303] px-3 py-1 hover:bg-[#f8eaea] transition-colors"
                      aria-label="Delete Section"
                      onClick={() => handleDeleteSection(section.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="mt-4">
                    <div className="flex items-center gap-2 mb-2">
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={(e) => {
                          setSelectedSectionId(section.id);
                          setPhotos(Array.from(e.target.files || []));
                        }}
                        className="rounded-lg border border-[#eaeaea] px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-[#a50303] transition"
                        aria-label="Select Photos"
                        disabled={uploadingPhotos}
                      />
                      <Button
                        type="button"
                        className={`rounded-full font-semibold bg-[#a50303] hover:bg-[#c70c0c] transition-colors flex items-center gap-2 text-white ${
                          photos.length === 0 ||
                          selectedSectionId !== section.id
                            ? "opacity-60 cursor-not-allowed"
                            : ""
                        }`}
                        onClick={handlePhotoUpload}
                        disabled={
                          uploadingPhotos ||
                          photos.length === 0 ||
                          selectedSectionId !== section.id
                        }
                        aria-label="Upload Photos"
                      >
                        <UploadCloud className="w-5 h-5" /> Upload
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-4 mt-4">
                      {section.photos.length === 0 ? (
                        <div className="text-muted-foreground text-sm">
                          No photos yet.
                        </div>
                      ) : (
                        section.photos.map((photo) => (
                          <motion.div
                            key={photo.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="relative group"
                          >
                            <img
                              src={photo.imageUrl}
                              alt={photo.caption || "Uploaded"}
                              className="w-24 h-24 object-cover rounded-xl border border-[#eaeaea] shadow"
                            />
                            <button
                              aria-label="Delete Photo"
                              className="absolute top-1 right-1 bg-white/80 rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
                              onClick={() => handleDeletePhoto(photo.id)}
                            >
                              <Trash2 className="w-4 h-4 text-[#a50303]" />
                            </button>
                          </motion.div>
                        ))
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </section>
      </motion.div>
    </main>
  );
};

function Button({
  children,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
}) {
  return (
    <button
      {...props}
      className={`transition focus:outline-none focus:ring-2 focus:ring-[#a50303] font-medium ${className}`}
    >
      {children}
    </button>
  );
}

export default GalleryAdminPage;
