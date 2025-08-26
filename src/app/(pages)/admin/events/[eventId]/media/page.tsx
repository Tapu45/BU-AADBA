"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableHeader,
  TableRow,
  TableCell,
  TableBody,
} from "@/components/ui/table";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X, ImagePlus, Trash2, Video, UploadCloud } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";

type Album = {
  id: string;
  title: string;
  description?: string;
  albumDate: string;
  coverImage?: string;
  createdBy?: string;
  isPublic: boolean;
  photos: Photo[];
};

type Photo = {
  id: string;
  imageUrl: string;
  caption?: string;
  uploadedBy?: string;
  isPublic: boolean;
  uploadDate: string;
};

type VideoType = {
  id: string;
  title: string;
  description?: string;
  videoUrl: string;
  thumbnailUrl?: string;
  duration?: number;
  isPublic: boolean;
  createdBy?: string;
  uploadDate: string;
};

export default function ManageEventMediaPage() {
  const { eventId } = useParams<{ eventId: string }>();
  const [albums, setAlbums] = useState<Album[]>([]);
  const [videos, setVideos] = useState<VideoType[]>([]);
  const [loading, setLoading] = useState(true);

  const [showAlbumForm, setShowAlbumForm] = useState(false);
  const [albumForm, setAlbumForm] = useState({
    title: "",
    description: "",
    albumDate: "",
    coverImage: "",
    createdBy: "",
    isPublic: true,
  });

  const [selectedAlbumId, setSelectedAlbumId] = useState<string | null>(null);
  const [showPhotoForm, setShowPhotoForm] = useState(false);
  const [photoForm, setPhotoForm] = useState({
    imageUrl: "",
    caption: "",
    uploadedBy: "",
    isPublic: true,
  });

  const [showVideoForm, setShowVideoForm] = useState(false);
  const [videoForm, setVideoForm] = useState({
    title: "",
    description: "",
    videoUrl: "",
    thumbnailUrl: "",
    duration: "",
    createdBy: "",
    isPublic: true,
  });

  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [uploadingVideo, setUploadingVideo] = useState(false);

  useEffect(() => {
    fetchAlbums();
    fetchVideos();
  }, [eventId]);

  const fetchAlbums = async () => {
    setLoading(true);
    const res = await fetch(`/api/admin/event/${eventId}/album`);
    const data = await res.json();
    setAlbums(data.albums || []);
    setLoading(false);
  };

  const fetchVideos = async () => {
    const res = await fetch(`/api/admin/event/${eventId}/video`);
    const data = await res.json();
    setVideos(data.videos || []);
  };

  const handleAlbumFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setAlbumForm({ ...albumForm, [e.target.name]: e.target.value });
  };

  const handleCreateAlbum = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(`/api/admin/event/${eventId}/album`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(albumForm),
    });
    if (res.ok) {
      setShowAlbumForm(false);
      setAlbumForm({
        title: "",
        description: "",
        albumDate: "",
        coverImage: "",
        createdBy: "",
        isPublic: true,
      });
      fetchAlbums();
    }
  };

  const handleDeleteAlbum = async (albumId: string) => {
    if (!confirm("Delete this album?")) return;
    await fetch(`/api/admin/event/${eventId}/album`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ albumId }),
    });
    fetchAlbums();
  };

  const handlePhotoFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPhotoForm({ ...photoForm, [e.target.name]: e.target.value });
  };

  async function uploadToCloudinary(file: File) {
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    if (data.success && data.data?.secure_url) {
      return data.data.secure_url;
    }
    throw new Error(data.error || "Upload failed");
  }

  const handleUploadPhoto = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAlbumId || !photoFile) return;
    setUploadingPhoto(true);
    try {
      const imageUrl = await uploadToCloudinary(photoFile);
      const res = await fetch(`/api/admin/album/${selectedAlbumId}/photo`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...photoForm, imageUrl }),
      });
      if (res.ok) {
        setShowPhotoForm(false);
        setSelectedAlbumId(null);
        setPhotoForm({
          imageUrl: "",
          caption: "",
          uploadedBy: "",
          isPublic: true,
        });
        setPhotoFile(null);
        fetchAlbums();
      }
    } catch (err) {
      alert("Photo upload failed");
    }
    setUploadingPhoto(false);
  };

  const handleDeletePhoto = async (albumId: string, photoId: string) => {
    await fetch(`/api/admin/album/${albumId}/photo`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ photoId }),
    });
    fetchAlbums();
  };

  const handleVideoFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setVideoForm({ ...videoForm, [e.target.name]: e.target.value });
  };

  const handleUploadVideo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!videoFile) return;
    setUploadingVideo(true);
    try {
      const videoUrl = await uploadToCloudinary(videoFile);
      const res = await fetch(`/api/admin/event/${eventId}/video`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...videoForm, videoUrl }),
      });
      if (res.ok) {
        setShowVideoForm(false);
        setVideoForm({
          title: "",
          description: "",
          videoUrl: "",
          thumbnailUrl: "",
          duration: "",
          createdBy: "",
          isPublic: true,
        });
        setVideoFile(null);
        fetchVideos();
      }
    } catch (err) {
      alert("Video upload failed");
    }
    setUploadingVideo(false);
  };

  const handleDeleteVideo = async (videoId: string) => {
    await fetch(`/api/admin/event/${eventId}/video`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ videoId }),
    });
    fetchVideos();
  };

  return (
    <main className="min-h-screen bg-[#f8f8fa] px-2 py-0">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="max-w-5xl mx-auto"
      >
        <header className="mb-10 flex flex-col gap-2 items-center">
          <h1 className="text-4xl font-extrabold text-[#a50303] tracking-tight">
            Event Media Manager
          </h1>
          <p className="text-lg text-muted-foreground font-medium">
            Curate albums, photos, and videos for your event
          </p>
        </header>

        <section className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-[#a50303] flex items-center gap-2">
              <ImagePlus className="w-6 h-6" /> Photo Albums
            </h2>
            <Button
              aria-label={
                showAlbumForm ? "Cancel album creation" : "Create new album"
              }
              size="lg"
              className="rounded-full font-semibold shadow"
              onClick={() => setShowAlbumForm((v) => !v)}
            >
              <AnimatePresence mode="wait">
                {showAlbumForm ? (
                  <motion.span
                    key="cancel"
                    initial={{ opacity: 0, x: 8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -8 }}
                    className="flex items-center gap-2"
                  >
                    <X className="w-5 h-5" /> Cancel
                  </motion.span>
                ) : (
                  <motion.span
                    key="create"
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 8 }}
                    className="flex items-center gap-2"
                  >
                    <Plus className="w-5 h-5" /> Create Album
                  </motion.span>
                )}
              </AnimatePresence>
            </Button>
          </div>
          <AnimatePresence>
            {showAlbumForm && (
              <motion.form
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                onSubmit={handleCreateAlbum}
                className="bg-white rounded-2xl shadow-lg p-6 mb-6 flex flex-col gap-4 border border-[#eaeaea]"
              >
                <Input
                  name="title"
                  placeholder="Album Title"
                  value={albumForm.title}
                  onChange={handleAlbumFormChange}
                  required
                  autoFocus
                  className="rounded-lg"
                />
                <Textarea
                  name="description"
                  placeholder="Description"
                  value={albumForm.description}
                  onChange={handleAlbumFormChange}
                  className="rounded-lg"
                />
                <Input
                  name="albumDate"
                  type="date"
                  value={albumForm.albumDate}
                  onChange={handleAlbumFormChange}
                  required
                  className="rounded-lg"
                />
                <Input
                  name="coverImage"
                  placeholder="Cover Image URL"
                  value={albumForm.coverImage}
                  onChange={handleAlbumFormChange}
                  className="rounded-lg"
                />
                <Button
                  type="submit"
                  size="lg"
                  className="rounded-full font-semibold bg-[#a50303] hover:bg-[#c70c0c] transition-colors"
                >
                  <UploadCloud className="w-5 h-5 mr-2" /> Save Album
                </Button>
              </motion.form>
            )}
          </AnimatePresence>
          <div className="bg-white rounded-2xl shadow border border-[#eaeaea] overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-[#f3f3f7]">
                  <TableCell className="font-semibold">Title</TableCell>
                  <TableCell className="font-semibold">Date</TableCell>
                  <TableCell className="font-semibold">Actions</TableCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {albums.map((album) => (
                  <TableRow
                    key={album.id}
                    className="hover:bg-[#f8eaea] transition-colors"
                  >
                    <TableCell>{album.title}</TableCell>
                    <TableCell>
                      {new Date(album.albumDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Button
                        size="sm"
                        className="rounded-full font-medium bg-[#a50303] hover:bg-[#c70c0c] transition-colors"
                        aria-label="Upload photo"
                        onClick={() => {
                          setSelectedAlbumId(album.id);
                          setShowPhotoForm(true);
                        }}
                      >
                        <ImagePlus className="w-4 h-4 mr-1" /> Upload Photo
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="rounded-full ml-2 border-[#a50303] text-[#a50303] hover:bg-[#f8eaea] transition-colors"
                        aria-label="Delete album"
                        onClick={() => handleDeleteAlbum(album.id)}
                      >
                        <Trash2 className="w-4 h-4 mr-1" /> Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {albums.length === 0 && (
              <div className="py-6 text-center text-muted-foreground">
                No albums yet.
              </div>
            )}
          </div>
        </section>

        <AnimatePresence>
          {showPhotoForm && selectedAlbumId && (
            <Dialog
              open={showPhotoForm && !!selectedAlbumId}
              onOpenChange={(v) => {
                setShowPhotoForm(v);
                if (!v) setSelectedAlbumId(null);
              }}
            >
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2 text-[#a50303]">
                    <ImagePlus className="w-5 h-5" /> Upload Photo
                  </DialogTitle>
                  <DialogClose asChild>
                    <Button
                      variant="ghost"
                      className="absolute right-4 top-4"
                      onClick={() => {
                        setShowPhotoForm(false);
                        setSelectedAlbumId(null);
                      }}
                    >
                    
                    </Button>
                  </DialogClose>
                </DialogHeader>
                <form
                  onSubmit={handleUploadPhoto}
                  className="flex flex-col gap-4"
                >
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setPhotoFile(e.target.files?.[0] || null)}
                    required
                    className="rounded-lg"
                  />
                  <Textarea
                    name="caption"
                    placeholder="Caption"
                    value={photoForm.caption}
                    onChange={handlePhotoFormChange}
                    className="rounded-lg"
                  />
                 
                  <div className="flex gap-2">
                    <Button
                      type="submit"
                      size="lg"
                      className="rounded-full font-semibold bg-[#a50303] hover:bg-[#c70c0c]"
                      disabled={uploadingPhoto}
                    >
                      <UploadCloud className="w-5 h-5 mr-2" />{" "}
                      {uploadingPhoto ? "Uploading..." : "Upload"}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      className="rounded-full border-[#a50303] text-[#a50303] hover:bg-[#f8eaea]"
                      onClick={() => {
                        setShowPhotoForm(false);
                        setSelectedAlbumId(null);
                        setPhotoFile(null);
                      }}
                    >
                      <X className="w-5 h-5 mr-2" /> Cancel
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          )}
        </AnimatePresence>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-[#a50303] flex items-center gap-2">
            <ImagePlus className="w-6 h-6" /> Photos
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {albums.map((album) => (
              <motion.div
                key={album.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-2xl shadow border border-[#eaeaea] p-4"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-semibold text-lg">{album.title}</span>
                  {album.coverImage && (
                    <img
                      src={album.coverImage}
                      alt={album.title}
                      className="h-8 w-8 object-cover rounded-full border border-[#eaeaea]"
                    />
                  )}
                </div>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-[#f3f3f7]">
                        <TableCell className="font-semibold">Image</TableCell>
                        <TableCell className="font-semibold">Caption</TableCell>
                    
                        <TableCell className="font-semibold">Actions</TableCell>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {album.photos.map((photo) => (
                        <TableRow
                          key={photo.id}
                          className="hover:bg-[#f8eaea] transition-colors"
                        >
                          <TableCell>
                            <img
                              src={photo.imageUrl}
                              alt={photo.caption || ""}
                              className="h-12 w-12 object-cover rounded-lg border border-[#eaeaea]"
                              loading="lazy"
                            />
                          </TableCell>
                          <TableCell>{photo.caption}</TableCell>
                       
                          <TableCell>
                            <Button
                              size="sm"
                              variant="outline"
                              className="rounded-full border-[#a50303] text-[#a50303] hover:bg-[#f8eaea] transition-colors"
                              aria-label="Delete photo"
                              onClick={() =>
                                handleDeletePhoto(album.id, photo.id)
                              }
                            >
                              <Trash2 className="w-4 h-4 mr-1" /> Delete
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  {album.photos.length === 0 && (
                    <div className="py-4 text-center text-muted-foreground">
                      No photos in this album.
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-[#a50303] flex items-center gap-2">
              <Video className="w-6 h-6" /> Videos
            </h2>
            <Button
              aria-label={
                showVideoForm ? "Cancel video upload" : "Upload new video"
              }
              size="lg"
              className="rounded-full font-semibold shadow"
              onClick={() => setShowVideoForm((v) => !v)}
            >
              <AnimatePresence mode="wait">
                {showVideoForm ? (
                  <motion.span
                    key="cancel"
                    initial={{ opacity: 0, x: 8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -8 }}
                    className="flex items-center gap-2"
                  >
                    <X className="w-5 h-5" /> Cancel
                  </motion.span>
                ) : (
                  <motion.span
                    key="upload"
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 8 }}
                    className="flex items-center gap-2"
                  >
                    <Plus className="w-5 h-5" /> Upload Video
                  </motion.span>
                )}
              </AnimatePresence>
            </Button>
          </div>
          <AnimatePresence>
            {showVideoForm && (
              <Dialog open={showVideoForm} onOpenChange={setShowVideoForm}>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-[#a50303]">
                      <Video className="w-5 h-5" /> Upload Video
                    </DialogTitle>
                    <DialogClose asChild>
                      <Button
                        variant="ghost"
                        className="absolute right-4 top-4"
                        onClick={() => setShowVideoForm(false)}
                      >
                        <X className="w-5 h-5" />
                      </Button>
                    </DialogClose>
                  </DialogHeader>
                  <form
                    onSubmit={handleUploadVideo}
                    className="flex flex-col gap-4"
                  >
                    <Input
                      type="file"
                      accept="video/*"
                      onChange={(e) =>
                        setVideoFile(e.target.files?.[0] || null)
                      }
                      required
                      className="rounded-lg"
                    />
                    <Input
                      name="title"
                      placeholder="Video Title"
                      value={videoForm.title}
                      onChange={handleVideoFormChange}
                      required
                      className="rounded-lg"
                    />
                    <Textarea
                      name="description"
                      placeholder="Description"
                      value={videoForm.description}
                      onChange={handleVideoFormChange}
                      className="rounded-lg"
                    />
                    <Input
                      name="thumbnailUrl"
                      placeholder="Thumbnail URL"
                      value={videoForm.thumbnailUrl}
                      onChange={handleVideoFormChange}
                      className="rounded-lg"
                    />
                    <Input
                      name="duration"
                      type="number"
                      placeholder="Duration (seconds)"
                      value={videoForm.duration}
                      onChange={handleVideoFormChange}
                      className="rounded-lg"
                    />
                  
                    <Button
                      type="submit"
                      size="lg"
                      className="rounded-full font-semibold bg-[#a50303] hover:bg-[#c70c0c]"
                      disabled={uploadingVideo}
                    >
                      <UploadCloud className="w-5 h-5 mr-2" />{" "}
                      {uploadingVideo ? "Uploading..." : "Upload Video"}
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            )}
          </AnimatePresence>
          <div className="bg-white rounded-2xl shadow border border-[#eaeaea] overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-[#f3f3f7]">
                  <TableCell className="font-semibold">Title</TableCell>
                  <TableCell className="font-semibold">Thumbnail</TableCell>
                  <TableCell className="font-semibold">Actions</TableCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {videos.map((video) => (
                  <TableRow
                    key={video.id}
                    className="hover:bg-[#f8eaea] transition-colors"
                  >
                    <TableCell>{video.title}</TableCell>
                    <TableCell>
                      {video.thumbnailUrl && (
                        <img
                          src={video.thumbnailUrl}
                          alt={video.title}
                          className="h-12 w-12 object-cover rounded-lg border border-[#eaeaea]"
                          loading="lazy"
                        />
                      )}
                    </TableCell>
                    <TableCell>{video.createdBy}</TableCell>
                    <TableCell>
                      <Button
                        size="sm"
                        variant="outline"
                        className="rounded-full border-[#a50303] text-[#a50303] hover:bg-[#f8eaea] transition-colors"
                        aria-label="Delete video"
                        onClick={() => handleDeleteVideo(video.id)}
                      >
                        <Trash2 className="w-4 h-4 mr-1" /> Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {videos.length === 0 && (
              <div className="py-6 text-center text-muted-foreground">
                No videos yet.
              </div>
            )}
          </div>
        </section>
      </motion.div>
    </main>
  );
}
