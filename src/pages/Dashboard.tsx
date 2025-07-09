import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import {
  TrendingUp,
  Target,
  Clock,
  CheckCircle,
  AlertCircle,
  Plus,
  Brain,
  FileText,
  Users,
  Zap
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export const Dashboard: React.FC = () => {
  const { user } = useAuth();

  const stats = [
    { title: 'Active Projects', value: '12', change: '+2', icon: Target, color: 'text-primary' },
    { title: 'Tasks Completed', value: '89', change: '+15', icon: CheckCircle, color: 'text-success' },
    { title: 'Files Uploaded', value: '156', change: '+8', icon: FileText, color: 'text-secondary' },
    { title: 'AI Suggestions', value: '23', change: '+5', icon: Brain, color: 'text-warning' },
  ];

  const recentProjects = [
    { name: 'Mobile App Redesign', progress: 75, status: 'In Progress', dueDate: '2024-12-15' },
    { name: 'Marketing Campaign', progress: 45, status: 'Planning', dueDate: '2024-12-20' },
    { name: 'API Development', progress: 90, status: 'Review', dueDate: '2024-12-10' },
  ];

  const recentActivity = [
    { action: 'File uploaded', item: 'design-mockups.pdf', time: '2 hours ago', user: 'Jane Smith' },
    { action: 'Project updated', item: 'Mobile App Redesign', time: '4 hours ago', user: 'John Doe' },
    { action: 'AI suggestion', item: 'Task optimization for Marketing Campaign', time: '6 hours ago', user: 'System' },
    { action: 'Task completed', item: 'User research analysis', time: '8 hours ago', user: 'Jane Smith' },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold gradient-text">Welcome back, {user?.name}</h1>
          <p className="text-muted-foreground mt-1">
            Here's what's happening with your projects today.
          </p>
        </div>
        <Button className="button-primary">
          <Plus className="mr-2 h-4 w-4" />
          New Project
        </Button>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {stats.map((stat, index) => (
          <Card key={stat.title} className="glass-card hover-lift">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  <div className="flex items-center space-x-2 mt-2">
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <Badge variant="secondary" className="text-xs bg-success/20 text-success">
                      {stat.change}
                    </Badge>
                  </div>
                </div>
                <div className={`p-3 rounded-lg bg-muted/50 ${stat.color}`}>
                  <stat.icon className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Projects */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="glass-card h-full">
            <CardHeader>
              <CardTitle className="flex items-center text-xl">
                <Target className="mr-2 h-5 w-5 text-primary" />
                Recent Projects
              </CardTitle>
              <CardDescription>Track progress on your active projects</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentProjects.map((project, index) => (
                <div key={project.name} className="p-4 rounded-lg bg-muted/30 border border-border/50">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">{project.name}</h4>
                    <Badge 
                      variant={project.status === 'In Progress' ? 'default' : 'secondary'}
                      className="text-xs"
                    >
                      {project.status}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>Progress</span>
                      <span>{project.progress}%</span>
                    </div>
                    <Progress value={project.progress} className="h-2" />
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Clock className="mr-1 h-3 w-3" />
                      Due {project.dueDate}
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="glass-card h-full">
            <CardHeader>
              <CardTitle className="flex items-center text-xl">
                <Zap className="mr-2 h-5 w-5 text-secondary" />
                Recent Activity
              </CardTitle>
              <CardDescription>Latest updates from your team</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/30 transition-colors">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm">
                      <span className="font-medium">{activity.action}:</span>{' '}
                      <span className="text-muted-foreground">{activity.item}</span>
                    </p>
                    <div className="flex items-center justify-between mt-1">
                      <p className="text-xs text-muted-foreground">{activity.user}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-xl">Quick Actions</CardTitle>
            <CardDescription>Get started with common tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="outline" className="h-20 flex-col space-y-2 hover-lift">
                <Plus className="h-6 w-6" />
                <span>Create Project</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col space-y-2 hover-lift">
                <FileText className="h-6 w-6" />
                <span>Upload Files</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col space-y-2 hover-lift">
                <Brain className="h-6 w-6" />
                <span>AI Analysis</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};