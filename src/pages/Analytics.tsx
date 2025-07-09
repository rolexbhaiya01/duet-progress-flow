import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import {
  TrendingUp,
  TrendingDown,
  BarChart3,
  PieChart,
  Calendar,
  Download,
  Target,
  Clock,
  Users,
  CheckCircle
} from 'lucide-react';

export const Analytics: React.FC = () => {
  const metrics = [
    {
      title: 'Project Completion Rate',
      value: '78%',
      change: '+12%',
      trend: 'up',
      description: 'Projects completed on time'
    },
    {
      title: 'Team Productivity',
      value: '92%',
      change: '+8%',
      trend: 'up',
      description: 'Average task completion rate'
    },
    {
      title: 'Active Projects',
      value: '12',
      change: '-2',
      trend: 'down',
      description: 'Currently in progress'
    },
    {
      title: 'Files Uploaded',
      value: '156',
      change: '+23',
      trend: 'up',
      description: 'This month'
    }
  ];

  const projectProgress = [
    { name: 'Mobile App Redesign', progress: 75, status: 'On Track', dueDate: '2024-12-15' },
    { name: 'Marketing Campaign', progress: 45, status: 'At Risk', dueDate: '2024-12-20' },
    { name: 'API Development', progress: 90, status: 'Ahead', dueDate: '2024-12-10' },
    { name: 'User Research', progress: 30, status: 'Behind', dueDate: '2024-12-25' },
    { name: 'Documentation', progress: 60, status: 'On Track', dueDate: '2024-12-18' }
  ];

  const teamActivity = [
    { name: 'John Doe', tasks: 23, completed: 18, efficiency: 78 },
    { name: 'Jane Smith', tasks: 19, completed: 17, efficiency: 89 }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'On Track': return 'bg-success/20 text-success';
      case 'Ahead': return 'bg-primary/20 text-primary';
      case 'At Risk': return 'bg-warning/20 text-warning';
      case 'Behind': return 'bg-destructive/20 text-destructive';
      default: return 'bg-muted/20 text-muted-foreground';
    }
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
          <h1 className="text-3xl font-bold gradient-text">Analytics</h1>
          <p className="text-muted-foreground mt-1">
            Track performance and insights across all projects
          </p>
        </div>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export Report
        </Button>
      </motion.div>

      {/* Key Metrics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {metrics.map((metric, index) => (
          <Card key={metric.title} className="glass-card hover-lift">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm font-medium text-muted-foreground">{metric.title}</p>
                {metric.trend === 'up' ? (
                  <TrendingUp className="h-4 w-4 text-success" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-destructive" />
                )}
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <p className="text-2xl font-bold">{metric.value}</p>
                  <Badge 
                    variant="secondary" 
                    className={`text-xs ${
                      metric.trend === 'up' ? 'bg-success/20 text-success' : 'bg-destructive/20 text-destructive'
                    }`}
                  >
                    {metric.change}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">{metric.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Project Progress Overview */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="glass-card h-full">
            <CardHeader>
              <CardTitle className="flex items-center text-xl">
                <BarChart3 className="mr-2 h-5 w-5 text-primary" />
                Project Progress
              </CardTitle>
              <CardDescription>Current status of all active projects</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {projectProgress.map((project, index) => (
                <div key={project.name} className="p-4 rounded-lg bg-muted/30 border border-border/50">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-sm">{project.name}</h4>
                    <Badge className={getStatusColor(project.status)}>
                      {project.status}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-medium">{project.progress}%</span>
                    </div>
                    <Progress value={project.progress} className="h-2" />
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Calendar className="mr-1 h-3 w-3" />
                      Due {project.dueDate}
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Team Performance */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="glass-card h-full">
            <CardHeader>
              <CardTitle className="flex items-center text-xl">
                <Users className="mr-2 h-5 w-5 text-secondary" />
                Team Performance
              </CardTitle>
              <CardDescription>Individual productivity metrics</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {teamActivity.map((member, index) => (
                <div key={member.name} className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">{member.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {member.completed}/{member.tasks} tasks completed
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold">{member.efficiency}%</p>
                      <p className="text-xs text-muted-foreground">Efficiency</p>
                    </div>
                  </div>
                  <Progress value={member.efficiency} className="h-2" />
                  
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="p-3 rounded-lg bg-muted/50">
                      <div className="flex items-center justify-center mb-1">
                        <Target className="h-4 w-4 text-primary" />
                      </div>
                      <p className="text-sm font-medium">{member.tasks}</p>
                      <p className="text-xs text-muted-foreground">Total Tasks</p>
                    </div>
                    <div className="p-3 rounded-lg bg-muted/50">
                      <div className="flex items-center justify-center mb-1">
                        <CheckCircle className="h-4 w-4 text-success" />
                      </div>
                      <p className="text-sm font-medium">{member.completed}</p>
                      <p className="text-xs text-muted-foreground">Completed</p>
                    </div>
                    <div className="p-3 rounded-lg bg-muted/50">
                      <div className="flex items-center justify-center mb-1">
                        <Clock className="h-4 w-4 text-warning" />
                      </div>
                      <p className="text-sm font-medium">{member.tasks - member.completed}</p>
                      <p className="text-xs text-muted-foreground">Pending</p>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Weekly Activity Chart Placeholder */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center text-xl">
              <PieChart className="mr-2 h-5 w-5 text-accent" />
              Weekly Activity Overview
            </CardTitle>
            <CardDescription>Task completion trends over the past week</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-muted/30 rounded-lg border border-border/50">
              <div className="text-center">
                <BarChart3 className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">
                  Interactive charts will be displayed here
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Chart.js integration for detailed analytics
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};