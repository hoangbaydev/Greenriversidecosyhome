"use client";

import { motion } from "framer-motion";
import { useLocale, useDictionary } from "@/components/providers/I18nProvider";
import { WhatsAppButton } from "@/components/whatsapp/WhatsAppButton";
import { fadeUp, defaultTransition, viewportOnce } from "@/lib/motion";
import { getWhyStayItems } from "@/lib/content/brand";
import { BrandIconBadge } from "@/components/shared/BrandIconBadge";

/* const PILLARS_VI: any[] = [
  {
    id: "nature",
    eyebrow: "Thiên nhiên an lành",
    title: "Chốn nghỉ bình yên bên dòng sông Son lịch sử",
    description: "Khác biệt với những khách sạn bê tông ồn ào ở trung tâm thị trấn, Green Riverside hòa mình cùng thiên nhiên thơ mộng. Thức dậy trong làn sương sớm trên sông Son, ngắm nhìn đàn trâu gặm cỏ bên dãy núi đá vôi trùng điệp, và chèo thuyền kayak trực tiếp từ bến gỗ của chúng tôi. Một nhịp sống chậm rãi, bình yên đưa bạn chạm vào linh hồn của Phong Nha.",
    image: SAMPLE_IMAGES.river,
  },
  {
    id: "family",
    eyebrow: "Gia đình ấm áp",
    title: "Hơn cả một nơi lưu trú — ngôi nhà nuôi dưỡng bởi tình thân",
    description: "Chúng tôi là một gia đình địa phương, không phải một khách sạn thương mại. Được điều hành bởi cô Linh — người đã dành hơn 30 năm chia sẻ tình yêu Phong Nha với tư cách là một giáo viên và hướng dẫn viên bản địa — cùng gia đình, ngôi nhà của chúng tôi được xây dựng từ lòng hiếu khách chân thành nhất. Từ bữa tối gia đình ấm cúng đến những tư vấn lộ trình chân thực, chúng tôi đón tiếp bạn như người thân trở về nhà.",
    image: SAMPLE_IMAGES.homestay,
  },
  {
    id: "community",
    eyebrow: "Kết nối cộng đồng",
    title: "Nơi du khách bốn phương trở thành tri kỷ",
    description: "Chúng tôi tin rằng hành trình đẹp nhất là hành trình có những người bạn đồng hành. Quán Cozy Cafe Rooftop là không gian kết nối tự nhiên và thư thái. Thưởng thức ly cà phê muối lúc bình minh, nhâm nhi cốc bia thủ công lúc hoàng hôn, hay quây quần bên mâm cơm gia đình. Không ồn ào gượng ép, chỉ có những câu chuyện chân thành và những tình bạn đẹp được nảy nở.",
    image: SAMPLE_IMAGES.community,
  },
]; */

export function WhyChooseSection() {
  const locale = useLocale();
  const items = getWhyStayItems(locale);
  const dict = useDictionary();

  return (
    <section id="why-stay" className="home-section section-breathe home-section--soft home-section--divider">
      <div className="mx-auto w-full px-5 sm:px-8 lg:px-10 max-w-[72rem]">
        <header className="mb-8 text-center md:mb-10">
          <p className="text-eyebrow mb-2">
            {locale === "vi" ? "Vì sao chọn chúng tôi" : "Why Guests Love Us"}
          </p>
          <h2 className="text-text">{dict.home.whyStay.title}</h2>
          <p className="mx-auto mt-3 max-w-xl text-base leading-[1.65] text-text-muted">
            {dict.home.whyStay.subtitle}
          </p>
        </header>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <motion.article
              key={item.title}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              variants={fadeUp}
              transition={{ ...defaultTransition, delay: i * 0.05 }}
              className="experience-card p-5 md:p-6"
            >
              <BrandIconBadge icon={item.icon} />
              <h3 className="font-heading mt-4 text-base leading-snug text-text md:text-[1.0625rem]">
                {item.title}
              </h3>
              <p className="mt-2 line-clamp-3 text-sm leading-[1.62] text-text-muted">
                {item.description}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
export function FinalCtaSection({ content }: { content: { finalCtaTitle?: string; finalCtaSubtitle?: string; primaryCtaLabel?: string; primaryCtaMessageType?: string } }) {
  const title = content.finalCtaTitle;
  const subtitle = content.finalCtaSubtitle;
  if (!title?.trim()) return null;

  return (
    <section className="bg-primary py-16 md:py-20">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
        <p className="text-eyebrow !text-white/70">Green Riverside Cosy Home</p>
        <h2 className="font-heading mt-2 text-h1 !text-white">
          {title}
        </h2>
        {subtitle ? (
          <p className="mx-auto mt-3 max-w-lg text-base leading-relaxed !text-white/85">
            {subtitle}
          </p>
        ) : null}
        {content.primaryCtaLabel ? (
          <div className="mt-8 flex justify-center">
            <WhatsAppButton
              messageType={
                (content.primaryCtaMessageType as import("@/lib/whatsapp").WhatsAppMessageType) ||
                "book_room"
              }
              label={content.primaryCtaLabel}
              size="lg"
              variant="accent"
              className="min-h-12 px-7 text-base font-semibold"
            />
          </div>
        ) : null}
      </div>
    </section>
  );
}
