
import { useState } from "react";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

interface ProductUploadDialogProps {
  showUploadDialog: boolean;
  setShowUploadDialog: (show: boolean) => void;
}

export const ProductUploadDialog = ({
  showUploadDialog,
  setShowUploadDialog,
}: ProductUploadDialogProps) => {
  const [newProduct, setNewProduct] = useState<{
    title: string;
    description: string;
    price: number;
    currency: string;
    type: "PDF" | "MP3" | "Software";
    imageFile: File | null;
    mediaFile: File | null;
    imagePreview: string;
  }>({
    title: "",
    description: "",
    price: 0,
    currency: "USD",
    type: "PDF",
    imageFile: null,
    mediaFile: null,
    imagePreview: "",
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setNewProduct({
        ...newProduct,
        imageFile: file,
        imagePreview: URL.createObjectURL(file),
      });
    }
  };

  const handleMediaUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setNewProduct({
        ...newProduct,
        mediaFile: file,
      });
      toast.success("Media file selected successfully!");
    }
  };

  const handleUpload = () => {
    if (!newProduct.title || !newProduct.description || !newProduct.price || !newProduct.imageFile || !newProduct.mediaFile) {
      toast.error("Please fill in all required fields and upload both image and media files");
      return;
    }
    
    toast.success("Product uploaded successfully!");
    setShowUploadDialog(false);
    setNewProduct({
      title: "",
      description: "",
      price: 0,
      currency: "USD",
      type: "PDF",
      imageFile: null,
      mediaFile: null,
      imagePreview: "",
    });
  };

  return (
    <Dialog open={showUploadDialog} onOpenChange={setShowUploadDialog}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Upload className="h-4 w-4 mr-2" />
          Upload Product
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Upload Digital Product</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder="Product Title"
            value={newProduct.title}
            onChange={(e) => setNewProduct({...newProduct, title: e.target.value})}
          />
          <Input
            placeholder="Description"
            value={newProduct.description}
            onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
          />
          <div className="flex gap-2">
            <Input
              type="number"
              placeholder="Price"
              value={newProduct.price}
              onChange={(e) => setNewProduct({...newProduct, price: parseFloat(e.target.value)})}
              className="flex-1"
            />
            <Select
              value={newProduct.currency}
              onValueChange={(value) => setNewProduct({...newProduct, currency: value})}
            >
              <SelectTrigger className="w-24">
                <SelectValue placeholder="Currency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="USD">USD</SelectItem>
                <SelectItem value="EUR">EUR</SelectItem>
                <SelectItem value="GBP">GBP</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Select
            value={newProduct.type}
            onValueChange={(value: "PDF" | "MP3" | "Software") => 
              setNewProduct({...newProduct, type: value})
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="PDF">PDF</SelectItem>
              <SelectItem value="MP3">MP3</SelectItem>
              <SelectItem value="Software">Software</SelectItem>
            </SelectContent>
          </Select>
          <div className="space-y-2">
            <label className="block text-sm font-medium">Product Image</label>
            <Input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
            />
            {newProduct.imagePreview && (
              <img
                src={newProduct.imagePreview}
                alt="Preview"
                className="mt-2 rounded-lg max-h-32 object-cover"
              />
            )}
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium">Product File</label>
            <Input
              type="file"
              accept=".pdf,.mp3,.zip"
              onChange={handleMediaUpload}
            />
          </div>
          <Button onClick={handleUpload} className="w-full">
            Upload Product
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
