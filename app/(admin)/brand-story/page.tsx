import { getBrandStories } from "@/app/(admin)/brand-story/actions";
import { BrandStoryClient } from "@/components/admin/brand-story-client";

export default async function BrandStoryPage() {
  const brandStories = await getBrandStories();

  return <BrandStoryClient initialBrandStories={brandStories} />;
}
