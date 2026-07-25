import type { Metadata } from "next";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

export const metadata: Metadata = {
  title: "Thanks for upgrading — IndianWhisper",
  description: "Your IndianWhisper Pro license is ready.",
  robots: { index: false, follow: false },
};

export default async function ThanksPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; license_key?: string; email?: string }>;
}) {
  const params = await searchParams;
  const succeeded = params.status === "succeeded" || params.status === "active";
  const licenseKey = succeeded && typeof params.license_key === "string"
    ? params.license_key
    : "";

  return (
    <>
      <Navbar />
      <main className="hero-gradient min-h-[80vh] px-6 pb-20 pt-36">
        <section className="mx-auto max-w-2xl rounded-2xl border border-[#18D1E0]/30 bg-[#18D1E0]/[0.04] p-8 text-center">
          <h1 className="text-4xl font-bold">
            Thanks for upgrading to <span className="gradient-text">Pro</span>
          </h1>
          <p className="mt-5 text-lg text-[#A1A1AA]">
            Your license key is in your email. Open IndianWhisper → Settings → License,
            paste the key, and click Activate.
          </p>

          {licenseKey && (
            <div className="mt-8 rounded-xl border border-white/10 bg-black/30 p-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#A1A1AA]">
                Your license key
              </p>
              <code className="mt-3 block break-all text-lg text-white">{licenseKey}</code>
            </div>
          )}

          <p className="mt-6 text-sm text-[#71717A]">
            Keep the email for your receipt and license record. Need help?{" "}
            <a className="text-[#18D1E0]" href="mailto:aiwithdhruv@gmail.com">
              aiwithdhruv@gmail.com
            </a>
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
