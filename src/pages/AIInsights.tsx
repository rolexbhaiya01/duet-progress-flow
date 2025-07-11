import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import {
  Brain,
  Sparkles,
  Target,
  TrendingUp,
  Lightbulb,
  AlertCircle,
  CheckCircle,
  Zap,
  RefreshCw,
  Send
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Suggestion {
  id: string;
  type: 'optimization' | 'warning' | 'improvement' | 'insight';
  title: string;
  description: string;
  priority: 'Low' | 'Medium' | 'High';
  project: string;
  timestamp: string;
}

export const AIInsights: React.FC = () => {
  const [projectInput, setProjectInput] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [showApiKeyInput, setShowApiKeyInput] = useState(true);
  const { toast } = useToast();

  const suggestions: Suggestion[] = [
    {
      id: '1',
      type: 'optimization',
      title: 'Task Prioritization Optimization',
      description: 'Based on your Mobile App Redesign progress, consider prioritizing user testing tasks to meet the December 15 deadline more efficiently.',
      priority: 'High',
      project: 'Mobile App Redesign',
      timestamp: '2 hours ago'
    },
    {
      id: '2',
      type: 'warning',
      title: 'Resource Allocation Alert',
      description: 'Marketing Campaign project is 20% behind schedule. Consider allocating additional resources or extending the timeline.',
      priority: 'Medium',
      project: 'Marketing Campaign',
      timestamp: '4 hours ago'
    },
    {
      id: '3',
      type: 'improvement',
      title: 'Team Collaboration Enhancement',
      description: 'Implement daily stand-ups for the API Development project to improve communication and reduce blockers.',
      priority: 'Medium',
      project: 'API Development',
      timestamp: '6 hours ago'
    },
    {
      id: '4',
      type: 'insight',
      title: 'Productivity Pattern Analysis',
      description: 'Your team shows 35% higher productivity on Tuesdays and Wednesdays. Consider scheduling critical tasks during these days.',
      priority: 'Low',
      project: 'General',
      timestamp: '1 day ago'
    },
    {
      id: '5',
      type: 'optimization',
      title: 'File Organization Recommendation',
      description: 'Create dedicated folders for each project phase to improve file management efficiency by an estimated 25%.',
      priority: 'Low',
      project: 'General',
      timestamp: '1 day ago'
    }
  ];

  const getSuggestionIcon = (type: Suggestion['type']) => {
    switch (type) {
      case 'optimization': return TrendingUp;
      case 'warning': return AlertCircle;
      case 'improvement': return Lightbulb;
      case 'insight': return Target;
      default: return Brain;
    }
  };

  const getSuggestionColor = (type: Suggestion['type']) => {
    switch (type) {
      case 'optimization': return 'bg-primary/20 text-primary';
      case 'warning': return 'bg-warning/20 text-warning';
      case 'improvement': return 'bg-secondary/20 text-secondary';
      case 'insight': return 'bg-success/20 text-success';
      default: return 'bg-muted/20 text-muted-foreground';
    }
  };

  const getPriorityColor = (priority: Suggestion['priority']) => {
    switch (priority) {
      case 'High': return 'bg-destructive/20 text-destructive';
      case 'Medium': return 'bg-warning/20 text-warning';
      case 'Low': return 'bg-success/20 text-success';
      default: return 'bg-muted/20 text-muted-foreground';
    }
  };

  const callGeminiAPI = async (prompt: string) => {
    if (!apiKey.trim()) {
      toast({
        title: "API Key required",
        description: "Please enter your Google Gemini API key.",
        variant: "destructive",
      });
      return null;
    }

    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `As a project management AI assistant, analyze this project description and provide actionable insights and suggestions for improvement: ${prompt}`
            }]
          }]
        }),
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();
      return data.candidates?.[0]?.content?.parts?.[0]?.text || "No response generated";
    } catch (error) {
      console.error('Gemini API Error:', error);
      toast({
        title: "API Error",
        description: "Failed to connect to Gemini AI. Please check your API key.",
        variant: "destructive",
      });
      return null;
    }
  };

  const handleAnalyze = async () => {
    if (!projectInput.trim()) {
      toast({
        title: "Input required",
        description: "Please describe your project or question for AI analysis.",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    
    const aiResponse = await callGeminiAPI(projectInput);
    
    if (aiResponse) {
      toast({
        title: "Analysis complete!",
        description: "AI has generated new insights for your project.",
      });
      console.log('AI Response:', aiResponse);
    }
    
    setIsAnalyzing(false);
    setProjectInput('');
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
          <h1 className="text-3xl font-bold gradient-text">AI Insights</h1>
          <p className="text-muted-foreground mt-1">
            Get intelligent suggestions and analysis for your projects
          </p>
        </div>
        <Button className="button-secondary">
          <RefreshCw className="mr-2 h-4 w-4" />
          Refresh Insights
        </Button>
      </motion.div>

      {/* API Key Input */}
      {showApiKeyInput && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="glass-card border-warning/50">
            <CardHeader>
              <CardTitle className="flex items-center text-xl text-warning">
                <AlertCircle className="mr-2 h-5 w-5" />
                Google Gemini API Key Required
              </CardTitle>
              <CardDescription>
                Enter your Google Gemini API key to enable AI analysis. Get your key from Google AI Studio.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <input
                  type="password"
                  placeholder="Enter your Google Gemini API key..."
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  className="flex-1 px-3 py-2 bg-muted/50 border border-border rounded-md focus:border-primary focus:outline-none"
                />
                <Button 
                  onClick={() => setShowApiKeyInput(false)}
                  disabled={!apiKey.trim()}
                  className="button-primary"
                >
                  Save Key
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Your API key is stored locally and never shared. For production use, connect to Supabase for secure secret management.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* AI Analysis Input */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center text-xl">
              <Brain className="mr-2 h-5 w-5 text-primary" />
              AI Project Analysis
            </CardTitle>
            <CardDescription>
              Describe your project, goals, or challenges to get personalized AI insights
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder="Example: I'm working on a mobile app redesign project with a team of 2 developers. We need to complete user testing and implement feedback by December 15. What's the best approach to prioritize tasks and meet our deadline?"
              value={projectInput}
              onChange={(e) => setProjectInput(e.target.value)}
              className="min-h-[120px] bg-muted/50 border-border focus:border-primary resize-none"
            />
            <div className="flex items-center justify-between">
              <p className="text-xs text-muted-foreground">
                Powered by Google Gemini AI • Your data is processed securely
              </p>
              <div className="flex gap-2">
                {!showApiKeyInput && (
                  <Button 
                    onClick={() => setShowApiKeyInput(true)}
                    variant="outline"
                    size="sm"
                  >
                    Change API Key
                  </Button>
                )}
                <Button 
                  onClick={handleAnalyze}
                  disabled={isAnalyzing || !apiKey.trim()}
                  className="button-primary"
                >
                  {isAnalyzing ? (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Analyze Project
                    </>
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-6"
      >
        {[
          { title: 'Total Insights', value: '47', icon: Brain, color: 'text-primary' },
          { title: 'Implemented', value: '23', icon: CheckCircle, color: 'text-success' },
          { title: 'High Priority', value: '8', icon: AlertCircle, color: 'text-warning' },
          { title: 'This Week', value: '12', icon: Zap, color: 'text-secondary' },
        ].map((stat, index) => (
          <Card key={stat.title} className="glass-card hover-lift">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold mt-1">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-lg bg-muted/50 ${stat.color}`}>
                  <stat.icon className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </motion.div>

      {/* Suggestions List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center text-xl">
              <Sparkles className="mr-2 h-5 w-5 text-secondary" />
              Recent Insights & Suggestions
            </CardTitle>
            <CardDescription>
              AI-generated recommendations based on your project data
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {suggestions.map((suggestion, index) => {
              const SuggestionIcon = getSuggestionIcon(suggestion.type);
              return (
                <motion.div
                  key={suggestion.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="p-4 rounded-lg bg-muted/30 border border-border/50 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-start space-x-3">
                    <div className={`p-2 rounded-lg ${getSuggestionColor(suggestion.type)}`}>
                      <SuggestionIcon className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-medium">{suggestion.title}</h4>
                        <div className="flex items-center space-x-2">
                          <Badge className={getPriorityColor(suggestion.priority)}>
                            {suggestion.priority}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {suggestion.type}
                          </Badge>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {suggestion.description}
                      </p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>Project: {suggestion.project}</span>
                        <span>{suggestion.timestamp}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};