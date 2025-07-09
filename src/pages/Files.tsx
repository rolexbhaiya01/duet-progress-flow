import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Upload,
  Search,
  Filter,
  FileText,
  Image,
  File,
  Download,
  Trash,
  Eye,
  MoreVertical,
  FolderOpen,
  Calendar
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';

interface FileItem {
  id: string;
  name: string;
  type: 'pdf' | 'docx' | 'image' | 'audio' | 'text' | 'other';
  size: string;
  uploadedBy: string;
  uploadedAt: string;
  category: string;
}

export const Files: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const { toast } = useToast();

  const files: FileItem[] = [
    {
      id: '1',
      name: 'Project_Requirements.pdf',
      type: 'pdf',
      size: '2.4 MB',
      uploadedBy: 'John Doe',
      uploadedAt: '2024-12-01',
      category: 'Documents'
    },
    {
      id: '2',
      name: 'UI_Mockups.png',
      type: 'image',
      size: '1.8 MB',
      uploadedBy: 'Jane Smith',
      uploadedAt: '2024-12-02',
      category: 'Design'
    },
    {
      id: '3',
      name: 'Meeting_Notes.docx',
      type: 'docx',
      size: '156 KB',
      uploadedBy: 'John Doe',
      uploadedAt: '2024-12-03',
      category: 'Documents'
    },
    {
      id: '4',
      name: 'Demo_Recording.mp3',
      type: 'audio',
      size: '12.3 MB',
      uploadedBy: 'Jane Smith',
      uploadedAt: '2024-12-04',
      category: 'Media'
    },
    {
      id: '5',
      name: 'API_Documentation.txt',
      type: 'text',
      size: '45 KB',
      uploadedBy: 'John Doe',
      uploadedAt: '2024-12-05',
      category: 'Technical'
    },
    {
      id: '6',
      name: 'Brand_Guidelines.pdf',
      type: 'pdf',
      size: '3.2 MB',
      uploadedBy: 'Jane Smith',
      uploadedAt: '2024-12-06',
      category: 'Design'
    }
  ];

  const getFileIcon = (type: FileItem['type']) => {
    switch (type) {
      case 'pdf':
      case 'docx':
      case 'text':
        return FileText;
      case 'image':
        return Image;
      default:
        return File;
    }
  };

  const getTypeColor = (type: FileItem['type']) => {
    switch (type) {
      case 'pdf': return 'bg-destructive/20 text-destructive';
      case 'docx': return 'bg-primary/20 text-primary';
      case 'image': return 'bg-secondary/20 text-secondary';
      case 'audio': return 'bg-warning/20 text-warning';
      case 'text': return 'bg-success/20 text-success';
      default: return 'bg-muted/20 text-muted-foreground';
    }
  };

  const categories = ['All', 'Documents', 'Design', 'Media', 'Technical'];
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredFiles = files.filter(file => {
    const matchesSearch = file.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || file.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = Array.from(e.dataTransfer.files);
    toast({
      title: "Files uploaded!",
      description: `Successfully uploaded ${files.length} file(s).`,
    });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold gradient-text">Files</h1>
          <p className="text-muted-foreground mt-1">
            Manage and organize your project files
          </p>
        </div>
        <Button className="button-primary">
          <Upload className="mr-2 h-4 w-4" />
          Upload Files
        </Button>
      </motion.div>

      {/* Upload Area */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card 
          className={`glass-card border-2 border-dashed transition-all duration-300 ${
            dragActive ? 'border-primary bg-primary/5 scale-105' : 'border-border/50'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <CardContent className="p-8 text-center">
            <div className="mx-auto w-16 h-16 bg-gradient-primary/20 rounded-2xl flex items-center justify-center mb-4">
              <Upload className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Drop files here to upload</h3>
            <p className="text-muted-foreground mb-4">
              Support for PDFs, DOCX, images, audio files, and more
            </p>
            <Button variant="outline" className="button-secondary">
              Choose Files
            </Button>
          </CardContent>
        </Card>
      </motion.div>

      {/* Search and Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4"
      >
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search files..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-muted/50 border-border focus:border-primary"
          />
        </div>
        
        <div className="flex items-center space-x-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className={selectedCategory === category ? "button-primary" : ""}
            >
              {category}
            </Button>
          ))}
        </div>
      </motion.div>

      {/* Files Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        {filteredFiles.map((file, index) => {
          const FileIcon = getFileIcon(file.type);
          return (
            <motion.div
              key={file.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <Card className="glass-card hover-lift">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 rounded-lg bg-muted/50">
                        <FileIcon className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm truncate">{file.name}</h4>
                        <Badge className={`${getTypeColor(file.type)} text-xs mt-1`}>
                          {file.type.toUpperCase()}
                        </Badge>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          Preview
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-3 pt-0">
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{file.size}</span>
                    <Badge variant="outline" className="text-xs">
                      {file.category}
                    </Badge>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex items-center text-xs text-muted-foreground">
                      <span>Uploaded by {file.uploadedBy}</span>
                    </div>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Calendar className="mr-1 h-3 w-3" />
                      <span>{file.uploadedAt}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Empty State */}
      {filteredFiles.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <FolderOpen className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">No files found</h3>
          <p className="text-muted-foreground mb-4">
            {searchTerm ? 'Try adjusting your search terms' : 'Upload your first file to get started'}
          </p>
          <Button className="button-primary">
            <Upload className="mr-2 h-4 w-4" />
            Upload Files
          </Button>
        </motion.div>
      )}
    </div>
  );
};