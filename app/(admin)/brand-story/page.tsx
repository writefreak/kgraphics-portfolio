import { BrandStoryClient } from "@/components/admin/brand-story-client";
import { getBrandStory } from "./actions";

export default async function BrandStoryPage() {
  const brandStory = await getBrandStory();

  return <BrandStoryClient initialBrandStory={brandStory} />;
}
