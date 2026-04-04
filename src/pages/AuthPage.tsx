import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/lib/auth";
import { useTranslation } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [loading, setLoading] = useState(false);
  const { signIn, signUp } = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (isLogin) {
      const { error } = await signIn(email, password);
      if (error) {
        toast.error(error.message);
      } else {
        toast.success("Welcome back!");
        navigate("/");
      }
    } else {
      if (password.length < 6) {
        toast.error("Password must be at least 6 characters");
        setLoading(false);
        return;
      }
      const { error } = await signUp(email, password, displayName);
      if (error) {
        toast.error(error.message);
      } else {
        toast.success("Account created! Please check your email to verify.");
      }
    }
    setLoading(false);
  };

  return (
    <div className="section-padding">
      <div className="container-custom max-w-md">
        <div className="bg-card border border-border rounded-lg p-8">
          <h1 className="font-heading text-2xl font-bold text-center mb-2">
            {isLogin ? t("signIn") : t("signUp")}
          </h1>
          <p className="text-muted-foreground text-center text-sm mb-8">
            {isLogin ? t("signInDesc") : t("signUpDesc")}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="text-sm font-medium mb-2 block">{t("displayName")}</label>
                <Input
                  required
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder={t("displayName")}
                />
              </div>
            )}
            <div>
              <label className="text-sm font-medium mb-2 block">{t("email")}</label>
              <Input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t("yourEmail")}
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">{t("password")}</label>
              <Input
                required
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                minLength={6}
              />
            </div>

            <Button type="submit" className="w-full" size="lg" disabled={loading}>
              {loading ? "..." : isLogin ? t("signIn") : t("signUp")}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            {isLogin ? t("noAccount") : t("haveAccount")}{" "}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-accent font-medium hover:underline"
            >
              {isLogin ? t("signUp") : t("signIn")}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
