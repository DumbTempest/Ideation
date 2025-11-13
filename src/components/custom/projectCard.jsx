import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export default function ProjectCard({ name, description, domain, techStack }) {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div>
          <p className="text-sm font-semibold">Domain:</p>
          <p className="text-sm text-muted-foreground">{domain}</p>
        </div>

        <div>
          <p className="text-sm font-semibold">Tech Stack:</p>
          <p className="text-sm text-muted-foreground">
            {techStack?.join(", ")}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
