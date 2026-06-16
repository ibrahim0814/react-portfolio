// Very basic blog data layer. Posts are authored inline here as structured
// content blocks so they render cleanly without a markdown dependency.

export type Block =
  | { type: "p"; text: string }
  | { type: "ol"; items: { heading: string; body: string }[] };

export type Post = {
  slug: string;
  title: string;
  date: string; // ISO yyyy-mm-dd
  excerpt: string;
  content: Block[];
};

const posts: Post[] = [
  {
    slug: "optimism",
    title: "No one (really) knows anything",
    date: "2026-06-15",
    excerpt:
      "Trust in anyone's words but your own will likely mislead you. The only way forward is with optimism and hope",
    content: [
      {
        type: "p",
        text: "The Knicks won the NBA championship in fives games on the back of an unlikely superstar: Jalen Brunson. He's won at the high school level, the college level, and now he's an NBA champion and Finals MVP to boot. But he was doubted at every level he played at even though the results were clear as day. After he got to the NBA (a second round recruit) he scored 41 points in a playoff game to singlehandedly help the Mavericks advance in the playoffs. What was his prize for doing so in free agency? A contract worth 50% less than the team who eventually signed him, the Knicks. Even so, the general consensus was that New York seemingly took a “wild” bet on Jalen Brunson by giving him a $100 million contract.",
      },
      {
        type: "p",
        text: "This all sounds absurd in retrospect, but I think there's a broader lesson in here for me and for everyone else who really wants to do something meaningful with their life: no one really knows what they're talking about. Absolute trust in anyone's words except for your own will likely disappoint you on your quest to achieve something. Jalen Brunson could have listened to all the people who told him he was “too small” or “not the right person to lead a team to a championship” but he decided to put more stock in his work and capabilities.",
      },
      {
        type: "p",
        text: "The reality is that it's very easy to be pessimistic. Realistically speaking, most of the time these people are right. What is actually very difficult is being optimistic and ignoring the deafening roar of the masses. Most people are not worth listening to. The only real path forward is stepping through life with optimism and hope.",
      },
    ],
  },
  {
    slug: "moats",
    title: "What are the real moats if you're running a software company?",
    date: "2026-06-14",
    excerpt:
      "When anyone can build anything, raw code generation stops being a moat. So what's left? Product, go-to-market, and human relationships.",
    content: [
      {
        type: "p",
        text: "I've been thinking about this quite a lot recently. The coding models have gotten so good at this point that, as of June 2026, I believe engineering as an applied discipline is never going to be the same again. Btw, I'm writing this after the infamous recall by the US Gov on Fable/Mythos. A sign of the times.",
      },
      {
        type: "p",
        text: "This leads me to the title of this post. What is the moat in software development in a world in which anyone can build anything? I find myself undulating constantly between shock and awe at the rate at which models are improving and the types of things that I can now hand off to them. In a few months' time, no engineer on the planet will have an edge, in terms of raw code generation, over any frontier model.",
      },
      {
        type: "p",
        text: "And maybe… this is a good thing? The Silicon Valley lore of the cracked engineer might be cracking. As someone who's been in the software industry for roughly a decade, I never really enjoyed writing the perfect line of code. For me it's always been about the outcomes that software enabled. Faster, cheaper, more efficient, less grunt work. These are outcomes. And in a world increasingly governed by better and better frontier AI coding models, this is what we should all be chasing after anyway.",
      },
      {
        type: "p",
        text: "In my mind, here are the rough moats around which we need to build software companies:",
      },
      {
        type: "ol",
        items: [
          {
            heading: "Product is now king (hint: it always was)",
            body: "If you don't have anything worthy of selling, none of what follows actually matters. The good news is that you can quickly validate and test ideas now, at astonishingly high fidelity. You can have an MVP of a well-defined product working end-to-end in a matter of hours, let customers use it, see what they think, and promote or discard it from your backlog right away. Details matter as much as ever. The bar for quality software has always been high, but now that coding ability is no longer the bottleneck, the leverage is in how you communicate with the models. Customer interaction and the ability to extract product insight by talking to normal people is arguably more important than the ability to execute on ideas (execution is cheap now).",
          },
          {
            heading: "GTM motion & sales",
            body: "After product, this is the thing that differentiates mediocre companies from generational companies. If you don't have a solid GTM strategy, you will absolutely be crushed by your competitors who do. Because guess what? They have access to the same models you do, and their ability to copy-and-paste your products is laughably easy. If you want any chance of survival in the cutthroat AI app-layer landscape, your ability to sell matters more than ever. I would go as far as to say that in 2026, a high-quality sales rep is far more valuable than any engineering hire you can make. The differentiator here will be companies who deeply understand the space they're working in, the various pain points associated with it, and the matching product suite to actually deliver will win.",
          },
          {
            heading: "Human relationships",
            body: "This ties into number 2 quite a bit, but the ability to form long-term relationships with clients and build trust is a massive moat. Ultimately at the app layer, what you're really doing is partnering with a company and telling them that “hey, we've got this so you can focus on what you do best.” You're trying to convey a sense of safety in going with your product over the competitors, and that comes when you do the right things: listen, have empathy, and care about the people in your pipeline. It's hard to do this, but when it's genuine, people know.",
          },
        ],
      },
    ],
  },
];

export function getAllPosts(): Post[] {
  return [...posts].sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}

export function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return `${months[m - 1]} ${d}, ${y}`;
}
