"use client";

import { useState } from "react";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-dm-sans",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
});

export default function HomePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <main className={`${dmSans.variable} ${cormorant.variable}`}>
      <nav>
        <a href="#" className="nav-logo">
          <span>freshly</span> homes
        </a>
        <ul className="nav-links">
          <li>
            <a href="#services">Services</a>
          </li>
          <li>
            <a href="#how">How it works</a>
          </li>
          <li>
            <a href="#reviews">Reviews</a>
          </li>
          <li>
            <a href="#faq">FAQ</a>
          </li>
          <li>
            <a href="#partners">Partners</a>
          </li>
        </ul>
        <a href="/book" className="nav-cta">
          Book a clean
        </a>
      </nav>

      <section className="hero">
        <div className="hero-bg-ring r1" />
        <div className="hero-bg-ring r2" />
        <div className="hero-bg-ring r3" />
        <div className="hero-eyebrow anim-up d1">
          Lee&apos;s Summit, MO &nbsp;&middot;&nbsp; Locally owned
        </div>
        <h1 className="anim-up d2">
          Your home,
          <br />
          <em>always at</em>
          <br />
          its best.
        </h1>
        <p className="hero-sub anim-up d3">
          Professional home cleaning with online booking, reliable vetted
          cleaners, and the kind of communication that&apos;s been missing from
          this industry.
        </p>
        <div className="hero-actions anim-up d4">
          <a href="/book" className="btn-primary">
            Book a clean
          </a>
          <a href="#services" className="btn-ghost">
            See our services
          </a>
        </div>
        <div className="hero-stats anim-up d5">
          <div className="hero-stat">
            <div className="hero-stat-num">6</div>
            <div className="hero-stat-label">
              Days a week
              <br />
              including Saturday
            </div>
          </div>
          <div className="hero-stat">
            <div className="hero-stat-num">90s</div>
            <div className="hero-stat-label">
              To book online,
              <br />
              no phone calls
            </div>
          </div>
          <div className="hero-stat">
            <div className="hero-stat-num">★ 5.0</div>
            <div className="hero-stat-label">
              Google rating,
              <br />
              Lee&apos;s Summit
            </div>
          </div>
        </div>
      </section>

      <div className="trust-bar">
        <div className="trust-bar-inner">
          <div className="trust-bar-item">
            <span>Instant booking confirmation</span>
          </div>
          <div className="trust-bar-dot" />
          <div className="trust-bar-item">
            <span>Day-before reminder text</span>
          </div>
          <div className="trust-bar-dot" />
          <div className="trust-bar-item">
            <span>Vetted local cleaners</span>
          </div>
          <div className="trust-bar-dot" />
          <div className="trust-bar-item">
            <span>Saturday availability</span>
          </div>
          <div className="trust-bar-dot" />
          <div className="trust-bar-item">
            <span>Satisfaction guaranteed</span>
          </div>
          <div className="trust-bar-dot" />
          <div className="trust-bar-item">
            <span>Pay after completion</span>
          </div>
          <div className="trust-bar-dot" />
          <div className="trust-bar-item">
            <span>No surprise charges</span>
          </div>
          <div className="trust-bar-dot" />
          <div className="trust-bar-item">
            <span>Instant booking confirmation</span>
          </div>
          <div className="trust-bar-dot" />
          <div className="trust-bar-item">
            <span>Day-before reminder text</span>
          </div>
          <div className="trust-bar-dot" />
          <div className="trust-bar-item">
            <span>Vetted local cleaners</span>
          </div>
          <div className="trust-bar-dot" />
          <div className="trust-bar-item">
            <span>Saturday availability</span>
          </div>
          <div className="trust-bar-dot" />
          <div className="trust-bar-item">
            <span>Satisfaction guaranteed</span>
          </div>
          <div className="trust-bar-dot" />
          <div className="trust-bar-item">
            <span>Pay after completion</span>
          </div>
          <div className="trust-bar-dot" />
          <div className="trust-bar-item">
            <span>No surprise charges</span>
          </div>
          <div className="trust-bar-dot" />
        </div>
      </div>

      <section className="section services-section" id="services">
        <div className="services-header">
          <div className="section-eyebrow">What we offer</div>
          <h2 className="section-h2">A clean for every situation</h2>
          <p className="section-sub">
            Transparent, simple services. Your price is shown before you ever
            hit submit — no surprise charges, no awkward calls.
          </p>
        </div>
        <div className="services-grid">
          <div className="service-card">
            <div className="service-num">01</div>
            <div className="service-name">Standard clean</div>
            <p className="service-desc">
              Your go-to recurring clean. Bathrooms scrubbed, kitchen wiped
              down, floors vacuumed and mopped, surfaces dusted. Keeps your
              home consistently fresh.
            </p>
            <ul className="service-includes">
              <li>Bathrooms — toilets, sinks, showers</li>
              <li>Kitchen surfaces and appliance exteriors</li>
              <li>Vacuuming all rooms</li>
              <li>Mopping hard floors</li>
              <li>Dusting surfaces and furniture</li>
            </ul>
            <a href="/book" className="service-cta">
              Book this →
            </a>
          </div>
          <div className="service-card featured">
            <span className="service-tag">Most popular</span>
            <div className="service-num">02</div>
            <div className="service-name">Deep clean</div>
            <p className="service-desc">
              Everything in the standard clean plus the details most people skip
              — inside appliances, baseboards, window sills, cabinet fronts,
              and the grime that builds up over time.
            </p>
            <ul className="service-includes">
              <li>Everything in standard clean</li>
              <li>Inside oven and refrigerator</li>
              <li>Baseboards and window sills</li>
              <li>Cabinet fronts wiped down</li>
              <li>Light fixtures and ceiling fans</li>
              <li>Behind and under furniture</li>
            </ul>
            <a href="/book" className="service-cta">
              Book this →
            </a>
          </div>
          <div className="service-card">
            <div className="service-num">03</div>
            <div className="service-name">Move in / move out</div>
            <p className="service-desc">
              A full top-to-bottom clean for empty homes. Perfect after a move,
              before a new tenant, or when you need a truly fresh start.
              Available weekends — our biggest advantage.
            </p>
            <ul className="service-includes">
              <li>Complete deep clean of entire home</li>
              <li>Inside all cabinets and drawers</li>
              <li>Inside all appliances</li>
              <li>Walls spot-cleaned</li>
              <li>Available 7 days with notice</li>
            </ul>
            <span
              className="service-tag"
              style={{
                background: "#E1F5EE",
                color: "#085041",
                display: "block",
                width: "fit-content",
                marginTop: "14px",
              }}
            >
              Great for moves
            </span>
            <a href="/book" className="service-cta">
              Book this →
            </a>
          </div>
        </div>
      </section>

      <section className="section how-section" id="how">
        <div className="section-eyebrow">How it works</div>
        <h2 className="section-h2">
          Book in 90 seconds.
          <br />
          We handle everything else.
        </h2>
        <p className="section-sub">
          No phone tag, no waiting for a quote, no wondering if they&apos;ll
          actually show up. This is what hiring a cleaner should feel like.
        </p>
        <div className="how-grid">
          <div className="how-step">
            <div className="how-step-num">01</div>
            <div>
              <div className="how-step-title">Book online in 90 seconds</div>
              <p className="how-step-desc">
                Choose your service, enter your home size and address, pick a
                date and time that works for you. Your price shows instantly —
                no back-and-forth. Hit confirm and you&apos;re done.
              </p>
              <span className="how-step-tag">No account required</span>
            </div>
          </div>
          <div className="how-step">
            <div className="how-step-num">02</div>
            <div>
              <div className="how-step-title">Instant confirmation arrives</div>
              <p className="how-step-desc">
                A confirmation text and email lands immediately — not
                &quot;within 24 hours,&quot; right now. It has everything: date,
                time, what&apos;s included, and who to contact. The night
                before, we send a reminder.
              </p>
              <span className="how-step-tag">Text + email</span>
            </div>
          </div>
          <div className="how-step">
            <div className="how-step-num">03</div>
            <div>
              <div className="how-step-title">
                Your cleaner shows up — on time
              </div>
              <p className="how-step-desc">
                We text you when they&apos;re on the way. You don&apos;t have to
                be home — just leave entry instructions when you book. Our
                cleaners are vetted, known to us personally, and show up every
                single time.
              </p>
              <span className="how-step-tag">On the way text included</span>
            </div>
          </div>
          <div className="how-step">
            <div className="how-step-num">04</div>
            <div>
              <div className="how-step-title">Done — and we follow up</div>
              <p className="how-step-desc">
                You get a completion text when they finish. Then an hour later,
                we check in to make sure everything looks right. If anything&apos;s
                off, we&apos;ll make it right before you even have to ask.
              </p>
              <span className="how-step-tag">Satisfaction guaranteed</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section why-section" id="why">
        <div className="section-eyebrow">Why Freshly Homes</div>
        <h2 className="section-h2">
          Built around the
          <br />
          experience, not just the clean
        </h2>
        <p className="section-sub">
          Most cleaning companies are great at cleaning but terrible at
          everything around it — the booking, the communication, the
          reliability. We built Freshly Homes to fix that.
        </p>
        <div className="why-grid">
          <div className="why-card">
            <div className="why-icon">
              <div className="why-icon-dot" />
            </div>
            <div className="why-title">Weekend availability</div>
            <p className="why-desc">
              We work Saturdays — and available Sunday with advance notice. Most
              of our competitors close weekends. For busy families, that&apos;s
              the whole game.
            </p>
          </div>
          <div className="why-card">
            <div className="why-icon">
              <div className="why-icon-dot" />
            </div>
            <div className="why-title">Instant online booking</div>
            <p className="why-desc">
              No calling around. No leaving voicemails. No waiting two days for
              a quote. Book, confirm, and get a text confirmation in under two
              minutes.
            </p>
          </div>
          <div className="why-card">
            <div className="why-icon">
              <div className="why-icon-dot" />
            </div>
            <div className="why-title">Vetted, trusted cleaners</div>
            <p className="why-desc">
              Every cleaner in our network is personally known to us. We don&apos;t
              pull from a random pool — we build real relationships with reliable
              people who care about the work.
            </p>
          </div>
          <div className="why-card">
            <div className="why-icon">
              <div className="why-icon-dot" />
            </div>
            <div className="why-title">Communication that works</div>
            <p className="why-desc">
              Confirmation, reminder, on-the-way text, completion notification,
              follow-up. You&apos;re never left wondering. This alone separates
              us from 90% of the market.
            </p>
          </div>
          <div className="why-card">
            <div className="why-icon">
              <div className="why-icon-dot" />
            </div>
            <div className="why-title">Transparent pricing</div>
            <p className="why-desc">
              Your price is shown before you book. No hidden add-ons, no
              &quot;we&apos;ll let you know after we see the house.&quot; What you
              see is what you pay.
            </p>
          </div>
          <div className="why-card">
            <div className="why-icon">
              <div className="why-icon-dot" />
            </div>
            <div className="why-title">Satisfaction promise</div>
            <p className="why-desc">
              If something&apos;s not right, tell us within 24 hours and we come
              back and fix it. No debates, no &quot;that&apos;s not covered.&quot;
              We make it right.
            </p>
          </div>
        </div>
        <div className="avail-block">
          <div className="avail-label">Our availability</div>
          <div className="avail-days">
            <div className="day-pill day-on">Mon</div>
            <div className="day-pill day-on">Tue</div>
            <div className="day-pill day-on">Wed</div>
            <div className="day-pill day-on">Thu</div>
            <div className="day-pill day-on">Fri</div>
            <div className="day-pill day-on">Sat</div>
            <div className="day-pill day-off">Sun</div>
          </div>
          <div className="avail-note">
            Open <strong>Monday through Saturday</strong>. Sunday available by
            request with advance notice. Most competitors in Lee&apos;s Summit
            close weekends entirely.
          </div>
        </div>
      </section>

      <section className="section compare-section" id="compare">
        <div className="section-eyebrow">How we compare</div>
        <h2 className="section-h2">
          What you actually get
          <br />
          vs the alternative
        </h2>
        <p className="section-sub">
          We know you have options. Here&apos;s an honest look at where Freshly
          Homes stands against a typical independent cleaner and a national
          franchise.
        </p>
        <div style={{ overflowX: "auto", marginTop: "40px" }}>
          <table className="compare-table">
            <thead>
              <tr>
                <th style={{ width: "35%" }}>Feature</th>
                <th style={{ width: "21%" }}>Independent cleaner</th>
                <th style={{ width: "21%" }}>National franchise</th>
                <th className="highlight" style={{ width: "23%" }}>
                  Freshly Homes
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Online booking</td>
                <td>
                  <span className="cross">✗ Text or call</span>
                </td>
                <td>
                  <span className="check">✓ Sometimes</span>
                </td>
                <td className="highlight">
                  <span className="check">✓ Always, 90 seconds</span>
                </td>
              </tr>
              <tr>
                <td>Instant price quote</td>
                <td>
                  <span className="cross">✗ Wait for response</span>
                </td>
                <td>
                  <span className="cross">✗ Usually an estimate</span>
                </td>
                <td className="highlight">
                  <span className="check">✓ Before you submit</span>
                </td>
              </tr>
              <tr>
                <td>Confirmation text + email</td>
                <td>
                  <span className="cross">✗ Rarely</span>
                </td>
                <td>
                  <span className="check">✓ Usually</span>
                </td>
                <td className="highlight">
                  <span className="check">✓ Immediate</span>
                </td>
              </tr>
              <tr>
                <td>Day-before reminder</td>
                <td>
                  <span className="cross">✗ Almost never</span>
                </td>
                <td>
                  <span className="check">✓ Sometimes</span>
                </td>
                <td className="highlight">
                  <span className="check">✓ Every time</span>
                </td>
              </tr>
              <tr>
                <td>Saturday availability</td>
                <td>
                  <span className="check">✓ Varies</span>
                </td>
                <td>
                  <span className="cross">✗ Mostly closed</span>
                </td>
                <td className="highlight">
                  <span className="check">✓ Always open</span>
                </td>
              </tr>
              <tr>
                <td>Post-clean follow-up</td>
                <td>
                  <span className="cross">✗ Rare</span>
                </td>
                <td>
                  <span className="cross">✗ Rare</span>
                </td>
                <td className="highlight">
                  <span className="check">✓ Every job</span>
                </td>
              </tr>
              <tr>
                <td>Satisfaction guarantee</td>
                <td>
                  <span className="cross">✗ Informal</span>
                </td>
                <td>
                  <span className="check">✓ Policy exists</span>
                </td>
                <td className="highlight">
                  <span className="check">✓ 24hr re-clean promise</span>
                </td>
              </tr>
              <tr>
                <td>Move in / out cleans</td>
                <td>
                  <span className="check">✓ Usually</span>
                </td>
                <td>
                  <span className="check">✓ Usually</span>
                </td>
                <td className="highlight">
                  <span className="check">✓ Weekends included</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="section reviews-section" id="reviews">
        <div className="section-eyebrow">Reviews</div>
        <h2 className="section-h2">
          What Lee&apos;s Summit
          <br />
          families are saying
        </h2>
        <div className="stars-row">
          <div className="stars-num">5.0</div>
          <div>
            <div style={{ color: "#F5C842", fontSize: "16px", letterSpacing: "2px" }}>
              ★★★★★
            </div>
            <div className="stars-detail" style={{ marginTop: "3px" }}>
              Google rating · Lee&apos;s Summit, MO
            </div>
          </div>
        </div>
        <div className="reviews-grid">
          <div className="review-card">
            <div className="review-stars">★★★★★</div>
            <p className="review-text">
              &quot;Booked online in two minutes flat. They showed up exactly on
              time, texted me when they were done, and the house looked
              absolutely incredible. This is genuinely how it should work.&quot;
            </p>
            <div className="review-author">
              <div className="review-avatar">SM</div>
              <div>
                <div className="review-name">Sarah M.</div>
                <div className="review-loc">Lee&apos;s Summit · Standard clean</div>
              </div>
            </div>
            <div className="review-google">Posted on Google</div>
          </div>
          <div className="review-card">
            <div className="review-stars">★★★★★</div>
            <p className="review-text">
              &quot;Finally a cleaning service that actually communicates. I got
              a reminder the night before, a text when they were on the way, and
              a follow-up after. My last cleaner just showed up whenever.&quot;
            </p>
            <div className="review-author">
              <div className="review-avatar">MT</div>
              <div>
                <div className="review-name">Mike T.</div>
                <div className="review-loc">Lee&apos;s Summit · Deep clean</div>
              </div>
            </div>
            <div className="review-google">Posted on Google</div>
          </div>
          <div className="review-card">
            <div className="review-stars">★★★★★</div>
            <p className="review-text">
              &quot;Used Freshly Homes for our move-out clean on a Saturday —
              which no one else would do. They were thorough, professional, and
              we got our full deposit back. Will absolutely use again.&quot;
            </p>
            <div className="review-author">
              <div className="review-avatar">JR</div>
              <div>
                <div className="review-name">Jessica R.</div>
                <div className="review-loc">Lee&apos;s Summit · Move-out clean</div>
              </div>
            </div>
            <div className="review-google">Posted on Google</div>
          </div>
        </div>
        <p style={{ fontSize: "12px", color: "var(--faint)", marginTop: "20px" }}>
          * Reviews shown are placeholder — replace with real Google reviews
          after your first cleans.
        </p>
      </section>

      <section className="section local-section" id="local">
        <div className="section-eyebrow">Locally rooted</div>
        <h2 className="section-h2">We live here too</h2>
        <p className="section-sub">
          Freshly Homes was started right here in Lee&apos;s Summit. We&apos;re
          not a franchise or a faceless app. We&apos;re your neighbors, and we
          treat your home like one.
        </p>
        <div className="local-grid">
          <div className="local-card">
            <div className="local-num">01</div>
            <div>
              <div className="local-title">Lee&apos;s Summit based</div>
              <p className="local-desc">
                We operate in Lee&apos;s Summit, Blue Springs, and surrounding
                areas. We know these neighborhoods and the families in them.
              </p>
            </div>
          </div>
          <div className="local-card">
            <div className="local-num">02</div>
            <div>
              <div className="local-title">Every cleaner is vetted</div>
              <p className="local-desc">
                We don&apos;t pull from anonymous pools. Every person who enters
                your home is personally known and trusted by our team.
              </p>
            </div>
          </div>
          <div className="local-card">
            <div className="local-num">03</div>
            <div>
              <div className="local-title">Locally owned, always</div>
              <p className="local-desc">
                No franchise fees, no corporate playbook. When you give us
                feedback it goes directly to the owner — and actually changes
                things.
              </p>
            </div>
          </div>
          <div className="local-card">
            <div className="local-num">04</div>
            <div>
              <div className="local-title">Built for busy families</div>
              <p className="local-desc">
                We started Freshly Homes because we needed it ourselves. Two
                kids, demanding schedules, and not enough time on weekends. We
                get it.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section partner-section" id="partners">
        <div className="section-eyebrow">Business partners</div>
        <h2 className="section-h2">
          Working with a moving
          <br />
          or real estate business?
        </h2>
        <p className="section-sub">
          We work directly with moving companies, real estate agents, and
          property managers to deliver reliable cleaning for their clients — on
          their timeline.
        </p>
        <div className="partner-card">
          <div className="partner-logo-area">
            <div className="partner-logo-box">
              <div className="partner-logo-inner" />
            </div>
            <div>
              <div className="partner-name">Freshly Homes Partner Program</div>
              <div className="partner-type">
                For businesses that need reliable cleaning on a schedule
              </div>
            </div>
          </div>
          <p className="partner-desc">
            Send us jobs directly through your own partner portal. No phone
            calls, no coordinating. You submit the job, we handle everything
            from scheduling to completion confirmation, and your client gets the
            same great experience.
          </p>
          <div className="partner-features">
            <div className="partner-feature">
              <strong>Direct job submission</strong>
              Submit cleans through your own portal login
            </div>
            <div className="partner-feature">
              <strong>Real-time status</strong>
              See job progress without calling us
            </div>
            <div className="partner-feature">
              <strong>Move-in / move-out focus</strong>
              Our specialty — available weekends
            </div>
            <div className="partner-feature">
              <strong>Monthly invoicing</strong>
              One invoice per month, not per job
            </div>
          </div>
          <a href="mailto:partners@freshly.homes" className="partner-cta">
            Become a partner →
          </a>
        </div>
      </section>

      <section className="section faq-section" id="faq">
        <div className="section-eyebrow">Common questions</div>
        <h2 className="section-h2">
          Good to know
          <br />
          before you book
        </h2>
        <div className="faq-grid">
          {[
            [
              "Do I need to be home during the clean?",
              "Not at all. Most of our clients aren't home. Just leave entry instructions when you book — a door code, a key location, whatever works for you. We'll text you when we arrive and when we're done.",
            ],
            [
              "Do your cleaners bring their own supplies?",
              "Yes, everything is provided — cleaning products, equipment, all of it. If you have specific product preferences or allergies, just note it in your booking and we'll accommodate.",
            ],
            [
              "What if I'm not happy with the clean?",
              "Tell us within 24 hours and we'll come back and make it right at no charge. No debates, no forms to fill out. We stand behind the work and it's that simple.",
            ],
            [
              "Can I set up recurring cleans?",
              "Absolutely. Weekly and biweekly recurring bookings are available and come with a discount. You can set it up during your first booking or after your first clean.",
            ],
            [
              "When do I pay?",
              "After the clean is complete — not before. You'll receive a payment link when we send the completion confirmation. We accept all major cards through Stripe, our secure payment provider.",
            ],
            [
              "How far in advance do I need to book?",
              "We recommend 48–72 hours ahead, especially for weekends which fill up first. For move-in/move-out cleans, a week's notice is ideal. Same-week bookings are sometimes available — just reach out.",
            ],
            [
              "What areas do you serve?",
              "We currently serve Lee's Summit, Blue Springs, Greenwood, and surrounding areas in the eastern KC metro. Not sure if we cover your address? Drop us a text and we'll let you know right away.",
            ],
            [
              "Can I request the same cleaner each time?",
              "Yes, and we'll always try to make that happen for recurring clients. We know consistency matters when someone's coming into your home. Just note your preference and we'll do our best to honor it.",
            ],
          ].map(([question, answer], index) => (
            <div
              key={question}
              className={`faq-item ${openFaq === index ? "open" : ""}`}
            >
              <button
                type="button"
                className="faq-q"
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
              >
                {question}
              </button>
              <div className="faq-a">{answer}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="cta-section" id="book">
        <div
          className="section-eyebrow"
          style={{ color: "var(--teal)", display: "inline-block", marginBottom: "16px" }}
        >
          Ready when you are
        </div>
        <h2 className="section-h2">Your home deserves this.</h2>
        <p className="cta-sub">
          Book online in 90 seconds. Confirmation lands instantly. Your home,
          always at its best.
        </p>
        <div className="cta-actions">
          <a href="/book" className="btn-primary">
            Book a clean now
          </a>
          <a href="sms:+18165550100" className="btn-ghost">
            Text us instead
          </a>
        </div>
        <p className="cta-small">
          No account required &nbsp;&middot;&nbsp; Price shown before you submit
          &nbsp;&middot;&nbsp; Pay after completion
        </p>
      </section>

      <footer>
        <div className="footer-top">
          <div className="footer-brand">
            <div className="footer-logo">
              <span>freshly</span> homes
            </div>
            <div className="footer-tagline">Your home, always at its best.</div>
            <div className="footer-contact">
              Lee&apos;s Summit, MO
              <br />
              <a href="sms:+18165550100">(816) 555-0100</a>
              <br />
              <a href="mailto:hello@freshly.homes">hello@freshly.homes</a>
            </div>
          </div>
          <div>
            <div className="footer-col-title">Services</div>
            <ul className="footer-links">
              <li>
                <a href="#">Standard clean</a>
              </li>
              <li>
                <a href="#">Deep clean</a>
              </li>
              <li>
                <a href="#">Move in / move out</a>
              </li>
              <li>
                <a href="#">Recurring cleans</a>
              </li>
            </ul>
          </div>
          <div>
            <div className="footer-col-title">Company</div>
            <ul className="footer-links">
              <li>
                <a href="#">About us</a>
              </li>
              <li>
                <a href="#">How it works</a>
              </li>
              <li>
                <a href="#">Reviews</a>
              </li>
              <li>
                <a href="#">Partners</a>
              </li>
            </ul>
          </div>
          <div>
            <div className="footer-col-title">Areas we serve</div>
            <ul className="footer-links">
              <li>
                <a href="#">Lee&apos;s Summit</a>
              </li>
              <li>
                <a href="#">Blue Springs</a>
              </li>
              <li>
                <a href="#">Greenwood</a>
              </li>
              <li>
                <a href="#">Raymore</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="footer-legal">
            © 2025 Freshly Homes LLC · Lee&apos;s Summit, MO
          </div>
          <div className="footer-legal">Privacy &nbsp;·&nbsp; Terms &nbsp;·&nbsp; Sitemap</div>
        </div>
      </footer>

      <style jsx global>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --teal: #1D9E75;
          --teal-dark: #0F6E56;
          --teal-light: #E1F5EE;
          --teal-faint: #f0faf6;
          --dark: #0c1610;
          --dark-2: #111e16;
          --dark-3: #0b130e;
          --cream: #fafaf7;
          --white: #ffffff;
          --gray: #f2f4f2;
          --border: #e4e8e4;
          --text: #1a1f1a;
          --muted: #5a6b5a;
          --faint: #9aaa9a;
          --font: var(--font-dm-sans), sans-serif;
          --serif: var(--font-cormorant), Georgia, serif;
        }

        html { scroll-behavior: smooth; }
        body {
          font-family: var(--font);
          background: var(--cream);
          color: var(--text);
          line-height: 1.6;
          overflow-x: hidden;
        }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes pulse { 0%, 100% { opacity: 0.6; } 50% { opacity: 1; } }
        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .anim-up { animation: fadeUp 0.7s ease both; }
        .anim-in { animation: fadeIn 0.8s ease both; }
        .d1 { animation-delay: 0.1s; }
        .d2 { animation-delay: 0.2s; }
        .d3 { animation-delay: 0.3s; }
        .d4 { animation-delay: 0.4s; }
        .d5 { animation-delay: 0.5s; }

        nav { position: sticky; top: 0; z-index: 100; background: rgba(12,22,16,0.96); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); border-bottom: 0.5px solid rgba(255,255,255,0.07); padding: 0 24px; display: flex; align-items: center; justify-content: space-between; height: 60px; }
        .nav-logo { font-size: 18px; font-weight: 500; color: #fff; letter-spacing: -0.3px; text-decoration: none; }
        .nav-logo span { color: var(--teal); }
        .nav-links { display: none; gap: 32px; list-style: none; }
        .nav-links a { font-size: 13px; color: rgba(255,255,255,0.55); text-decoration: none; transition: color .2s; }
        .nav-links a:hover { color: #fff; }
        .nav-cta { background: var(--teal); color: #fff; padding: 9px 20px; border-radius: 99px; font-size: 13px; font-weight: 500; text-decoration: none; transition: background .2s; white-space: nowrap; }
        .nav-cta:hover { background: var(--teal-dark); }

        .hero { background: var(--dark); padding: 64px 24px 72px; position: relative; overflow: hidden; }
        .hero-bg-ring { position: absolute; border-radius: 50%; border: 1px solid rgba(29,158,117,0.12); pointer-events: none; }
        .hero-bg-ring.r1 { width: 400px; height: 400px; top: -160px; right: -120px; }
        .hero-bg-ring.r2 { width: 600px; height: 600px; top: -240px; right: -220px; }
        .hero-bg-ring.r3 { width: 200px; height: 200px; bottom: -60px; left: -60px; }
        .hero-eyebrow { display: inline-flex; align-items: center; gap: 8px; font-size: 11px; font-weight: 500; color: var(--teal); text-transform: uppercase; letter-spacing: .1em; background: rgba(29,158,117,0.12); padding: 5px 12px; border-radius: 99px; margin-bottom: 24px; }
        .hero-eyebrow::before { content: ''; width: 6px; height: 6px; border-radius: 50%; background: var(--teal); animation: pulse 2s ease infinite; }
        .hero h1 { font-family: var(--serif); font-size: clamp(40px, 8vw, 80px); color: #fff; line-height: 1.08; letter-spacing: -1px; margin-bottom: 24px; font-weight: 500; }
        .hero h1 em { color: var(--teal); font-style: italic; }
        .hero-sub { font-size: 16px; color: rgba(255,255,255,0.5); line-height: 1.7; max-width: 480px; margin-bottom: 36px; }
        .hero-actions { display: flex; flex-wrap: wrap; gap: 12px; margin-bottom: 52px; }
        .btn-primary { background: var(--teal); color: #fff; padding: 14px 28px; border-radius: 10px; font-size: 15px; font-weight: 500; text-decoration: none; transition: background .2s, transform .15s; display: inline-block; border: none; }
        .btn-primary:hover { background: var(--teal-dark); transform: translateY(-1px); }
        .btn-ghost { background: rgba(255,255,255,0.07); color: rgba(255,255,255,0.7); padding: 14px 28px; border-radius: 10px; font-size: 15px; text-decoration: none; border: 0.5px solid rgba(255,255,255,0.12); transition: background .2s; display: inline-block; }
        .btn-ghost:hover { background: rgba(255,255,255,0.12); }
        .hero-stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0; border-top: 0.5px solid rgba(255,255,255,0.08); padding-top: 36px; }
        .hero-stat { padding: 0 0 0 20px; border-left: 0.5px solid rgba(255,255,255,0.08); }
        .hero-stat:first-child { padding-left: 0; border-left: none; }
        .hero-stat-num { font-family: var(--serif); font-size: 32px; color: #fff; line-height: 1; margin-bottom: 4px; }
        .hero-stat-label { font-size: 11px; color: rgba(255,255,255,0.35); line-height: 1.4; }

        .trust-bar { background: var(--teal); padding: 14px 24px; overflow: hidden; }
        .trust-bar-inner { display: flex; gap: 40px; align-items: center; white-space: nowrap; animation: marquee 30s linear infinite; }
        .trust-bar-item { display: flex; align-items: center; gap: 8px; font-size: 12px; font-weight: 500; color: rgba(255,255,255,0.9); flex-shrink: 0; }
        .trust-bar-dot { width: 4px; height: 4px; border-radius: 50%; background: rgba(255,255,255,0.5); }

        .section { padding: 72px 24px; }
        .section-eyebrow { font-size: 11px; font-weight: 500; color: var(--teal); text-transform: uppercase; letter-spacing: .1em; margin-bottom: 12px; }
        .section-h2 { font-family: var(--serif); font-size: clamp(28px, 5vw, 48px); font-weight: 500; line-height: 1.15; letter-spacing: -0.5px; margin-bottom: 16px; }
        .section-sub { font-size: 15px; color: var(--muted); line-height: 1.7; max-width: 560px; }

        .services-section { background: var(--cream); }
        .services-header { margin-bottom: 48px; }
        .services-grid { display: grid; grid-template-columns: 1fr; gap: 16px; }
        .service-card { background: var(--white); border: 0.5px solid var(--border); border-radius: 16px; padding: 28px; transition: border-color .2s, transform .2s; position: relative; overflow: hidden; }
        .service-card::before { content: ''; position: absolute; top: 0; left: 0; width: 4px; height: 100%; background: var(--teal); transform: scaleY(0); transform-origin: bottom; transition: transform .3s ease; }
        .service-card:hover { border-color: var(--teal); transform: translateY(-2px); }
        .service-card:hover::before { transform: scaleY(1); }
        .service-card.featured { background: var(--dark); border-color: transparent; }
        .service-card.featured::before { display: none; }
        .service-num { font-family: var(--serif); font-size: 48px; font-weight: 400; color: var(--teal-light); line-height: 1; margin-bottom: 16px; opacity: 0.4; }
        .service-card.featured .service-num { color: rgba(255,255,255,0.1); opacity: 1; }
        .service-name { font-size: 18px; font-weight: 500; margin-bottom: 8px; color: var(--text); }
        .service-card.featured .service-name { color: #fff; }
        .service-desc { font-size: 13px; color: var(--muted); line-height: 1.65; margin-bottom: 20px; }
        .service-card.featured .service-desc { color: rgba(255,255,255,0.55); }
        .service-includes { list-style: none; display: flex; flex-direction: column; gap: 6px; }
        .service-includes li { display: flex; align-items: center; gap: 8px; font-size: 12px; color: var(--muted); }
        .service-card.featured .service-includes li { color: rgba(255,255,255,0.5); }
        .service-includes li::before { content: ''; width: 5px; height: 5px; border-radius: 50%; background: var(--teal); flex-shrink: 0; }
        .service-tag { display: inline-block; font-size: 11px; font-weight: 500; padding: 4px 10px; border-radius: 99px; background: var(--teal-light); color: var(--teal-dark); margin-bottom: 14px; }
        .service-card.featured .service-tag { background: rgba(29,158,117,0.2); color: #5DCAA5; }
        .service-cta { display: inline-flex; align-items: center; gap: 6px; font-size: 13px; font-weight: 500; color: var(--teal); text-decoration: none; margin-top: 20px; transition: gap .2s; }
        .service-cta:hover { gap: 10px; }
        .service-card.featured .service-cta { color: #5DCAA5; }

        .how-section { background: var(--dark); color: #fff; }
        .how-section .section-h2 { color: #fff; }
        .how-section .section-sub { color: rgba(255,255,255,0.45); }
        .how-grid { display: grid; grid-template-columns: 1fr; gap: 0; margin-top: 52px; border-top: 0.5px solid rgba(255,255,255,0.08); }
        .how-step { display: grid; grid-template-columns: 60px 1fr; gap: 20px; align-items: start; padding: 32px 0; border-bottom: 0.5px solid rgba(255,255,255,0.08); }
        .how-step:last-child { border-bottom: none; }
        .how-step-num { font-family: var(--serif); font-size: 40px; font-weight: 400; color: rgba(255,255,255,0.12); line-height: 1; }
        .how-step-title { font-size: 17px; font-weight: 500; color: #fff; margin-bottom: 8px; }
        .how-step-desc { font-size: 13px; color: rgba(255,255,255,0.45); line-height: 1.7; }
        .how-step-tag { display: inline-block; font-size: 10px; font-weight: 500; padding: 3px 9px; border-radius: 99px; background: rgba(29,158,117,0.15); color: #5DCAA5; margin-top: 10px; }

        .why-section { background: var(--teal-faint); }
        .why-grid { display: grid; grid-template-columns: 1fr; gap: 16px; margin-top: 40px; }
        .why-card { background: var(--white); border: 0.5px solid var(--border); border-radius: 14px; padding: 24px; transition: border-color .2s, transform .2s; }
        .why-card:hover { border-color: var(--teal); transform: translateY(-2px); }
        .why-icon { width: 40px; height: 40px; border-radius: 10px; background: var(--teal-light); display: flex; align-items: center; justify-content: center; margin-bottom: 14px; }
        .why-icon-dot { width: 14px; height: 14px; border-radius: 50%; background: var(--teal); }
        .why-title { font-size: 15px; font-weight: 500; margin-bottom: 6px; }
        .why-desc { font-size: 13px; color: var(--muted); line-height: 1.65; }
        .avail-block { background: var(--dark); border-radius: 16px; padding: 28px; margin-top: 16px; }
        .avail-label { font-size: 11px; font-weight: 500; color: var(--teal); text-transform: uppercase; letter-spacing: .1em; margin-bottom: 16px; }
        .avail-days { display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 16px; }
        .day-pill { font-size: 12px; font-weight: 500; padding: 7px 14px; border-radius: 99px; transition: transform .15s; }
        .day-pill:hover { transform: scale(1.05); }
        .day-on { background: var(--teal); color: #fff; }
        .day-off { background: rgba(255,255,255,0.07); color: rgba(255,255,255,0.25); }
        .avail-note { font-size: 12px; color: rgba(255,255,255,0.3); }
        .avail-note strong { color: rgba(255,255,255,0.6); font-weight: 500; }

        .compare-section { background: var(--white); }
        .compare-table { width: 100%; margin-top: 40px; border-collapse: collapse; }
        .compare-table th { padding: 14px 16px; text-align: left; font-size: 12px; font-weight: 500; background: var(--gray); color: var(--muted); border-bottom: 0.5px solid var(--border); }
        .compare-table th.highlight { background: var(--teal); color: #fff; border-radius: 0; }
        .compare-table td { padding: 14px 16px; font-size: 13px; color: var(--text); border-bottom: 0.5px solid var(--border); }
        .compare-table td.highlight { background: var(--teal-faint); }
        .compare-table tr:last-child td { border-bottom: none; }
        .check { color: var(--teal); font-weight: 500; }
        .cross { color: #ccc; }
        .compare-table tr:hover td { background: var(--gray); }
        .compare-table tr:hover td.highlight { background: #e4f5ee; }

        .reviews-section { background: var(--cream); }
        .reviews-grid { display: grid; grid-template-columns: 1fr; gap: 16px; margin-top: 40px; }
        .review-card { background: var(--white); border: 0.5px solid var(--border); border-radius: 14px; padding: 24px; transition: border-color .2s; }
        .review-card:hover { border-color: var(--teal); }
        .review-stars { color: #F5C842; font-size: 13px; margin-bottom: 12px; letter-spacing: 2px; }
        .review-text { font-family: var(--serif); font-size: 17px; color: var(--text); line-height: 1.6; margin-bottom: 16px; font-style: italic; }
        .review-author { display: flex; align-items: center; gap: 10px; }
        .review-avatar { width: 36px; height: 36px; border-radius: 50%; background: var(--teal-light); display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 500; color: var(--teal-dark); flex-shrink: 0; }
        .review-name { font-size: 13px; font-weight: 500; }
        .review-loc { font-size: 11px; color: var(--faint); }
        .review-google { font-size: 10px; color: var(--faint); margin-top: 12px; padding-top: 12px; border-top: 0.5px solid var(--border); }
        .stars-row { display: flex; align-items: center; gap: 8px; margin-top: 28px; }
        .stars-num { font-family: var(--serif); font-size: 36px; font-weight: 500; color: var(--text); line-height: 1; }
        .stars-detail { font-size: 12px; color: var(--muted); }

        .partner-section { background: var(--dark-2); }
        .partner-section .section-h2 { color: #fff; }
        .partner-section .section-sub { color: rgba(255,255,255,0.4); }
        .partner-card { background: rgba(255,255,255,0.04); border: 0.5px solid rgba(255,255,255,0.08); border-radius: 16px; padding: 28px; margin-top: 32px; }
        .partner-logo-area { display: flex; align-items: center; gap: 14px; margin-bottom: 20px; }
        .partner-logo-box { width: 48px; height: 48px; border-radius: 12px; background: rgba(29,158,117,0.15); display: flex; align-items: center; justify-content: center; }
        .partner-logo-inner { width: 20px; height: 20px; border-radius: 4px; background: var(--teal); }
        .partner-name { font-size: 15px; font-weight: 500; color: #fff; }
        .partner-type { font-size: 12px; color: rgba(255,255,255,0.35); }
        .partner-desc { font-size: 13px; color: rgba(255,255,255,0.5); line-height: 1.7; margin-bottom: 20px; }
        .partner-features { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
        .partner-feature { background: rgba(255,255,255,0.04); border-radius: 8px; padding: 12px; font-size: 12px; color: rgba(255,255,255,0.5); border: 0.5px solid rgba(255,255,255,0.06); }
        .partner-feature strong { display: block; color: rgba(255,255,255,0.8); font-weight: 500; margin-bottom: 2px; font-size: 12px; }
        .partner-cta { display: inline-flex; align-items: center; gap: 8px; background: var(--teal); color: #fff; padding: 12px 22px; border-radius: 10px; font-size: 13px; font-weight: 500; text-decoration: none; margin-top: 20px; transition: background .2s; }
        .partner-cta:hover { background: var(--teal-dark); }

        .faq-section { background: var(--cream); }
        .faq-grid { display: grid; grid-template-columns: 1fr; gap: 12px; margin-top: 40px; }
        .faq-item { background: var(--white); border: 0.5px solid var(--border); border-radius: 12px; overflow: hidden; }
        .faq-q { width: 100%; padding: 18px 20px; font-size: 14px; font-weight: 500; cursor: pointer; display: flex; justify-content: space-between; align-items: center; user-select: none; transition: color .2s; text-align: left; background: transparent; border: none; }
        .faq-q:hover { color: var(--teal); }
        .faq-q::after { content: '+'; font-size: 18px; font-weight: 300; color: var(--teal); flex-shrink: 0; transition: transform .2s; }
        .faq-item.open .faq-q::after { transform: rotate(45deg); }
        .faq-a { max-height: 0; overflow: hidden; transition: max-height .3s ease, padding .3s ease; font-size: 13px; color: var(--muted); line-height: 1.7; padding: 0 20px; }
        .faq-item.open .faq-a { max-height: 200px; padding: 0 20px 18px; }

        .local-section { background: var(--teal-faint); }
        .local-grid { display: grid; grid-template-columns: 1fr; gap: 12px; margin-top: 36px; }
        .local-card { background: var(--white); border: 0.5px solid var(--border); border-radius: 12px; padding: 20px; display: flex; align-items: flex-start; gap: 14px; }
        .local-num { font-family: var(--serif); font-size: 28px; font-weight: 400; color: var(--teal); line-height: 1; flex-shrink: 0; min-width: 36px; }
        .local-title { font-size: 14px; font-weight: 500; margin-bottom: 4px; }
        .local-desc { font-size: 12px; color: var(--muted); line-height: 1.6; }

        .cta-section { background: var(--dark); padding: 80px 24px; text-align: center; position: relative; overflow: hidden; }
        .cta-section::before { content: ''; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 600px; height: 600px; border-radius: 50%; background: radial-gradient(circle, rgba(29,158,117,0.08) 0%, transparent 70%); pointer-events: none; }
        .cta-section .section-h2 { color: #fff; margin: 0 auto 12px; max-width: 560px; }
        .cta-sub { font-size: 16px; color: rgba(255,255,255,0.45); margin-bottom: 36px; }
        .cta-actions { display: flex; flex-wrap: wrap; gap: 12px; justify-content: center; }
        .cta-small { font-size: 12px; color: rgba(255,255,255,0.25); margin-top: 20px; }

        footer { background: var(--dark-3); padding: 48px 24px 32px; }
        .footer-top { display: grid; grid-template-columns: 1fr; gap: 36px; margin-bottom: 40px; padding-bottom: 40px; border-bottom: 0.5px solid rgba(255,255,255,0.07); }
        .footer-logo { font-size: 20px; font-weight: 500; color: #fff; letter-spacing: -0.3px; margin-bottom: 8px; }
        .footer-logo span { color: var(--teal); }
        .footer-tagline { font-size: 12px; color: rgba(255,255,255,0.3); margin-bottom: 16px; }
        .footer-contact { font-size: 13px; color: rgba(255,255,255,0.4); }
        .footer-contact a { color: var(--teal); text-decoration: none; }
        .footer-col-title { font-size: 11px; font-weight: 500; color: rgba(255,255,255,0.4); text-transform: uppercase; letter-spacing: .08em; margin-bottom: 14px; }
        .footer-links { list-style: none; display: flex; flex-direction: column; gap: 10px; }
        .footer-links a { font-size: 13px; color: rgba(255,255,255,0.4); text-decoration: none; transition: color .2s; }
        .footer-links a:hover { color: rgba(255,255,255,0.8); }
        .footer-bottom { display: flex; flex-direction: column; gap: 8px; align-items: flex-start; }
        .footer-legal { font-size: 11px; color: rgba(255,255,255,0.2); }

        @media (min-width: 640px) {
          .services-grid { grid-template-columns: 1fr 1fr; }
          .why-grid { grid-template-columns: 1fr 1fr; }
          .reviews-grid { grid-template-columns: 1fr 1fr; }
          .local-grid { grid-template-columns: 1fr 1fr; }
          .faq-grid { grid-template-columns: 1fr 1fr; }
        }
        @media (min-width: 768px) {
          nav { padding: 0 48px; }
          .nav-links { display: flex; }
          .hero { padding: 100px 48px 100px; }
          .section { padding: 96px 48px; }
          .cta-section { padding: 120px 48px; }
          footer { padding: 64px 48px 40px; }
          .footer-top { grid-template-columns: 2fr 1fr 1fr 1fr; gap: 48px; }
          .footer-bottom { flex-direction: row; justify-content: space-between; align-items: center; }
        }
        @media (min-width: 1024px) {
          nav { padding: 0 64px; }
          .hero { padding: 120px 64px 120px; }
          .section { padding: 112px 64px; }
          .services-grid { grid-template-columns: 1fr 1fr 1fr; }
          .why-grid { grid-template-columns: repeat(3, 1fr); }
          .reviews-grid { grid-template-columns: repeat(3, 1fr); }
          .local-grid { grid-template-columns: repeat(4, 1fr); }
          .how-grid { grid-template-columns: repeat(2, 1fr); border-top: none; gap: 0; }
          .how-step { border-right: 0.5px solid rgba(255,255,255,0.08); padding: 40px 40px 40px 0; }
          .how-step:nth-child(even) { border-right: none; padding-left: 40px; }
          footer { padding: 80px 64px 48px; }
        }
        @media (min-width: 1280px) {
          nav { padding: 0 80px; }
          .hero { padding: 140px 80px 140px; }
          .section { padding: 120px 80px; }
          footer { padding: 80px 80px 48px; }
        }
      `}</style>
    </main>
  );
}
