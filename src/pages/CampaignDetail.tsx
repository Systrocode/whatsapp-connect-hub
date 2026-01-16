import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Eye,
  MousePointer,
  DollarSign,
  Users,
  TrendingUp,
  Target,
  Calendar,
  ExternalLink
} from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useCampaignInsights } from "@/hooks/useCampaigns";

const statusColors: Record<string, string> = {
  active: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
  paused: "bg-amber-500/10 text-amber-500 border-amber-500/20",
  draft: "bg-muted text-muted-foreground border-border",
};

const CampaignDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: campaign, isLoading } = useQuery({
    queryKey: ["campaign", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("campaigns")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });

  const { data: insights, isLoading: isLoadingInsights } = useCampaignInsights(
    campaign?.meta_campaign_id || undefined
  );

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="space-y-6">
          <Skeleton className="h-8 w-64" />
          <div className="grid grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-32" />
            ))}
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (!campaign) {
    return (
      <DashboardLayout>
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold">Campaign not found</h2>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => navigate("/dashboard/campaigns")}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Campaigns
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  const stats = [
    {
      title: "Impressions",
      value: insights?.impressions || "—",
      icon: Eye,
      color: "text-primary",
    },
    {
      title: "Clicks",
      value: insights?.clicks || "—",
      icon: MousePointer,
      color: "text-emerald-500",
    },
    {
      title: "Spend",
      value: insights?.spend ? `₹${insights.spend}` : "—",
      icon: DollarSign,
      color: "text-amber-500",
    },
    {
      title: "Reach",
      value: insights?.reach || "—",
      icon: Users,
      color: "text-primary",
    },
    {
      title: "CTR",
      value: insights?.ctr ? `${(parseFloat(insights.ctr) * 100).toFixed(2)}%` : "—",
      icon: TrendingUp,
      color: "text-emerald-500",
    },
    {
      title: "CPC",
      value: insights?.cpc ? `₹${insights.cpc}` : "—",
      icon: Target,
      color: "text-amber-500",
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/dashboard/campaigns")}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-foreground">{campaign.name}</h1>
              <Badge variant="outline" className={statusColors[campaign.status] || statusColors.draft}>
                {campaign.status}
              </Badge>
            </div>
            <p className="text-muted-foreground">
              {campaign.objective.replace("OUTCOME_", "").replace(/_/g, " ")}
            </p>
          </div>
          {campaign.meta_campaign_id && (
            <Button variant="outline" asChild>
              <a
                href={`https://www.facebook.com/adsmanager/manage/campaigns?act=${campaign.meta_campaign_id}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Open in Meta
              </a>
            </Button>
          )}
        </div>

        {/* Performance Stats */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Performance (Last 7 Days)</h2>
          {isLoadingInsights ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Skeleton key={i} className="h-24" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={stat.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-xs font-medium text-muted-foreground">
                          {stat.title}
                        </CardTitle>
                        <Icon className={`w-4 h-4 ${stat.color}`} />
                      </CardHeader>
                      <CardContent>
                        <div className="text-xl font-bold">{stat.value}</div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>

        {/* Campaign Details */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Campaign Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Daily Budget</span>
                <span className="font-medium">
                  {campaign.daily_budget ? `₹${Number(campaign.daily_budget).toFixed(2)}` : "Not set"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Lifetime Budget</span>
                <span className="font-medium">
                  {campaign.lifetime_budget ? `₹${Number(campaign.lifetime_budget).toFixed(2)}` : "Not set"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Start Date</span>
                <span className="font-medium">
                  {campaign.start_date
                    ? new Date(campaign.start_date).toLocaleDateString()
                    : "Not set"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">End Date</span>
                <span className="font-medium">
                  {campaign.end_date
                    ? new Date(campaign.end_date).toLocaleDateString()
                    : "Ongoing"}
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Meta IDs</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Campaign ID</span>
                <span className="font-mono text-sm">
                  {campaign.meta_campaign_id || "Not synced"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Ad Set ID</span>
                <span className="font-mono text-sm">
                  {campaign.meta_adset_id || "Not created"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Ad ID</span>
                <span className="font-mono text-sm">
                  {campaign.meta_ad_id || "Not created"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Created</span>
                <span className="font-medium flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {new Date(campaign.created_at).toLocaleDateString()}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CampaignDetail;
