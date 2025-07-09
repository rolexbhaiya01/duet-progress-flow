import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Plus,
  Search,
  Filter,
  Calendar,
  Users,
  Target,
  MoreVertical,
  Edit,
  Trash,
  Eye
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface Project {
  id: string;
  name: string;
  description: string;
  progress: number;
  status: 'Planning' | 'In Progress' | 'Review' | 'Completed';
  dueDate: string;
  assignees: string[];
  priority: 'Low' | 'Medium' | 'High';
}

export const Projects: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const projects: Project[] = [
    {
      id: '1',
      name: 'Mobile App Redesign',
      description: 'Complete redesign of the mobile application with new UI/UX patterns',
      progress: 75,
      status: 'In Progress',
      dueDate: '2024-12-15',
      assignees: ['JD', 'JS'],
      priority: 'High'
    },
    {
      id: '2',
      name: 'Marketing Campaign Q4',
      description: 'Comprehensive marketing strategy for Q4 product launch',
      progress: 45,
      status: 'Planning',
      dueDate: '2024-12-20',
      assignees: ['JS'],
      priority: 'Medium'
    },
    {
      id: '3',
      name: 'API Development',
      description: 'RESTful API development for new features and integrations',
      progress: 90,
      status: 'Review',
      dueDate: '2024-12-10',
      assignees: ['JD'],
      priority: 'High'
    },
    {
      id: '4',
      name: 'User Research Study',
      description: 'Comprehensive user research and usability testing',
      progress: 30,
      status: 'In Progress',
      dueDate: '2024-12-25',
      assignees: ['JS', 'JD'],
      priority: 'Low'
    },
    {
      id: '5',
      name: 'Security Audit',
      description: 'Complete security audit and vulnerability assessment',
      progress: 100,
      status: 'Completed',
      dueDate: '2024-11-30',
      assignees: ['JD'],
      priority: 'High'
    },
    {
      id: '6',
      name: 'Documentation Update',
      description: 'Update technical documentation and user guides',
      progress: 60,
      status: 'In Progress',
      dueDate: '2024-12-18',
      assignees: ['JS'],
      priority: 'Medium'
    }
  ];

  const getStatusColor = (status: Project['status']) => {
    switch (status) {
      case 'Planning': return 'bg-warning/20 text-warning';
      case 'In Progress': return 'bg-primary/20 text-primary';
      case 'Review': return 'bg-secondary/20 text-secondary';
      case 'Completed': return 'bg-success/20 text-success';
      default: return 'bg-muted/20 text-muted-foreground';
    }
  };

  const getPriorityColor = (priority: Project['priority']) => {
    switch (priority) {
      case 'High': return 'bg-destructive/20 text-destructive';
      case 'Medium': return 'bg-warning/20 text-warning';
      case 'Low': return 'bg-success/20 text-success';
      default: return 'bg-muted/20 text-muted-foreground';
    }
  };

  const filteredProjects = projects.filter(project =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold gradient-text">Projects</h1>
          <p className="text-muted-foreground mt-1">
            Manage and track your collaborative projects
          </p>
        </div>
        <Button className="button-primary">
          <Plus className="mr-2 h-4 w-4" />
          New Project
        </Button>
      </motion.div>

      {/* Search and Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex items-center space-x-4"
      >
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-muted/50 border-border focus:border-primary"
          />
        </div>
        <Button variant="outline" size="sm">
          <Filter className="mr-2 h-4 w-4" />
          Filter
        </Button>
      </motion.div>

      {/* Projects Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {filteredProjects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
          >
            <Card className="glass-card hover-lift h-full">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg font-semibold mb-1">
                      {project.name}
                    </CardTitle>
                    <div className="flex items-center space-x-2 mb-2">
                      <Badge className={getPriorityColor(project.priority)}>
                        {project.priority}
                      </Badge>
                      <Badge className={getStatusColor(project.status)}>
                        {project.status}
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
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Project
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        <Trash className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <CardDescription className="text-sm">
                  {project.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Progress */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium">{project.progress}%</span>
                  </div>
                  <Progress value={project.progress} className="h-2" />
                </div>

                {/* Assignees */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Team</span>
                  </div>
                  <div className="flex -space-x-2">
                    {project.assignees.map((assignee, i) => (
                      <Avatar key={i} className="h-6 w-6 border-2 border-background">
                        <AvatarFallback className="text-xs bg-gradient-primary text-white">
                          {assignee}
                        </AvatarFallback>
                      </Avatar>
                    ))}
                  </div>
                </div>

                {/* Due Date */}
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>Due {project.dueDate}</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <Target className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">No projects found</h3>
          <p className="text-muted-foreground mb-4">
            {searchTerm ? 'Try adjusting your search terms' : 'Get started by creating your first project'}
          </p>
          <Button className="button-primary">
            <Plus className="mr-2 h-4 w-4" />
            Create Project
          </Button>
        </motion.div>
      )}
    </div>
  );
};