import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";

export function useWishlist() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const wishlistQuery = useQuery({
    queryKey: ["wishlist", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("wishlists")
        .select("product_id")
        .eq("user_id", user!.id);
      if (error) throw error;
      return data.map((w) => w.product_id);
    },
    enabled: !!user,
  });

  const addToWishlist = useMutation({
    mutationFn: async (productId: string) => {
      const { error } = await supabase
        .from("wishlists")
        .insert({ user_id: user!.id, product_id: productId });
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["wishlist"] }),
  });

  const removeFromWishlist = useMutation({
    mutationFn: async (productId: string) => {
      const { error } = await supabase
        .from("wishlists")
        .delete()
        .eq("user_id", user!.id)
        .eq("product_id", productId);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["wishlist"] }),
  });

  const isInWishlist = (productId: string) =>
    wishlistQuery.data?.includes(productId) ?? false;

  const toggleWishlist = (productId: string) => {
    if (!user) return;
    if (isInWishlist(productId)) {
      removeFromWishlist.mutate(productId);
    } else {
      addToWishlist.mutate(productId);
    }
  };

  return {
    wishlistIds: wishlistQuery.data ?? [],
    isInWishlist,
    toggleWishlist,
    loading: wishlistQuery.isLoading,
  };
}
