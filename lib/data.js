// Enhanced data service for TheQuiverIndia - Comprehensive Indian News Platform
import { articlesAPI, categoriesAPI, weatherAPI, trendingAPI } from './api'

// Keep mock data as fallback
const mockArticles = [
  {
    id: 1,
    title: "PM Modi Announces New Digital India 2.0 Initiative",
    slug: "pm-modi-announces-digital-india-2-initiative",
    excerpt: "Prime Minister unveils ambitious roadmap for digital transformation with focus on rural connectivity and AI integration across government services.",
    author: "Rajesh Sharma",
    category: "National",
    tags: ["modi", "digital-india", "technology", "government"],
    published_at: "2024-01-15T10:30:00Z",
    image: {
      src: "https://picsum.photos/seed/modi-digital-india/1200/800",
      alt: "PM Modi at Digital India 2.0 launch event"
    },
    reading_time: 6,
    views: 125000,
    shares: 2500,
    location: "New Delhi",
    region: "National",
    priority: "high",
    related_ids: [2, 15, 18],
    is_featured: true,
    is_breaking: false,
    sponsored: false,
    full_content: `
      <p>In a landmark announcement today, Prime Minister Narendra Modi unveiled the Digital India 2.0 initiative, marking a significant leap forward in the country's digital transformation journey. Speaking at the Vigyan Bhawan in New Delhi, the Prime Minister outlined an ambitious roadmap that promises to revolutionize how citizens interact with government services and access digital infrastructure across the nation.</p>

      <p>The comprehensive initiative, backed by a budget allocation of ₹2.5 lakh crores over the next five years, focuses on three fundamental pillars: universal digital access, artificial intelligence-powered governance, and sustainable digital infrastructure development.</p>

      <h3>Key Highlights of Digital India 2.0</h3>

      <p>"Digital India 2.0 is not merely about technology adoption; it represents our commitment to creating an inclusive digital ecosystem that empowers every citizen, regardless of their geographical location or economic background," PM Modi emphasized during his 45-minute address to a gathering of technology leaders, government officials, and international delegates.</p>

      <p>The initiative introduces several groundbreaking components:</p>

      <ul>
        <li><strong>AI-Powered Governance:</strong> Implementation of artificial intelligence across 500+ government services to reduce processing time by 70%</li>
        <li><strong>Rural Connectivity Expansion:</strong> High-speed internet access to 2.5 lakh villages through fiber optic networks</li>
        <li><strong>Digital Literacy Programs:</strong> Training for 10 crore citizens in digital skills over the next three years</li>
        <li><strong>Startup Ecosystem Support:</strong> ₹50,000 crore fund for technology startups focusing on indigenous solutions</li>
      </ul>

      <h3>Industry Response and Implementation Timeline</h3>

      <p>Leading technology companies have welcomed the announcement with enthusiasm. Sundar Pichai, CEO of Alphabet Inc., stated, "Google is committed to supporting India's digital transformation through our continued investments in infrastructure and education programs."</p>

      <p>Similarly, Mukesh Ambani, Chairman of Reliance Industries, announced Jio's commitment to invest ₹75,000 crores in expanding 5G infrastructure to support the Digital India 2.0 objectives.</p>

      <p>The implementation will be rolled out in three phases:</p>

      <ol>
        <li><strong>Phase 1 (2024-2025):</strong> Infrastructure development and pilot programs in 100 smart cities</li>
        <li><strong>Phase 2 (2025-2027):</strong> Nationwide rollout of AI-powered services and rural connectivity</li>
        <li><strong>Phase 3 (2027-2029):</strong> Advanced features integration and international collaboration programs</li>
      </ol>

      <h3>Expected Impact on Citizens</h3>

      <p>According to government estimates, Digital India 2.0 is expected to create 2.5 crore direct and indirect employment opportunities, particularly in tier-2 and tier-3 cities. The initiative aims to increase India's digital economy contribution to GDP from the current 8.5% to 20% by 2029.</p>

      <p>Dr. Ajay Kumar, Secretary of the Ministry of Electronics and Information Technology, explained, "This initiative will fundamentally transform how citizens access government services, from applying for documents to accessing healthcare and education services, all through a unified digital platform."</p>

      <h3>International Collaboration and Future Vision</h3>

      <p>The Digital India 2.0 framework also includes partnerships with leading global technology firms and academic institutions. Microsoft has committed to establishing three new AI research centers in Pune, Hyderabad, and Bangalore, while Amazon Web Services announced plans to invest $12.7 billion in cloud infrastructure development.</p>

      <p>As India continues to position itself as a global technology leader, Digital India 2.0 represents more than just a policy initiative—it embodies the nation's vision of becoming a digitally empowered society where technology serves as an enabler for inclusive growth and development.</p>

      <p>The success of this ambitious program will be closely monitored through a dedicated digital dashboard that will track key performance indicators including service delivery times, citizen satisfaction scores, and digital adoption rates across different demographics and regions.</p>

      <h3>State Government Reactions and Support</h3>

      <p>Several state governments have already expressed their enthusiasm for the Digital India 2.0 initiative. Uttar Pradesh Chief Minister Yogi Adityanath announced that the state would serve as a pilot region for implementing AI-powered governance systems, particularly in rural development and agricultural services.</p>

      <p>"Uttar Pradesh, with its vast rural population, presents the perfect testing ground for Digital India 2.0's rural connectivity initiatives," CM Adityanath stated during a press conference in Lucknow.</p>

      <p>Similarly, Karnataka Chief Minister Siddaramaiah emphasized the state's readiness to leverage its existing technology infrastructure. "Bangalore's Silicon Valley status will be further strengthened with the establishment of new AI research centers under this initiative," he remarked.</p>

      <h3>Challenges and Implementation Roadmap</h3>

      <p>Despite the overwhelming support, experts have identified several challenges that need to be addressed for successful implementation. Digital security, data privacy, and the digital divide between urban and rural areas remain key concerns that require careful attention.</p>

      <p>Dr. Raghuram Rajan, former RBI Governor and current Professor at the University of Chicago, provided his perspective: "While the vision is commendable, the execution will require unprecedented coordination between central and state governments, private sector partners, and civil society organizations."</p>

      <p>The government has outlined a comprehensive implementation strategy that includes:</p>

      <ul>
        <li><strong>Infrastructure Development:</strong> Laying 10 lakh kilometers of fiber optic cables across rural India</li>
        <li><strong>Skill Development:</strong> Training 50 lakh government employees in digital governance tools</li>
        <li><strong>Public-Private Partnerships:</strong> Collaborating with 200+ technology companies for innovation</li>
        <li><strong>Cybersecurity Framework:</strong> Establishing robust security protocols for digital services</li>
        <li><strong>Digital Inclusion Programs:</strong> Special focus on women, elderly, and differently-abled citizens</li>
      </ul>

      <h3>Economic Impact and Job Creation</h3>

      <p>Economic analysts predict that Digital India 2.0 could contribute significantly to India's GDP growth. According to a study by McKinsey & Company, the initiative could add $1 trillion to India's GDP by 2030, primarily through increased productivity and new business model innovations.</p>

      <p>The job creation potential is particularly promising. The initiative is expected to generate employment across various sectors:</p>

      <ol>
        <li><strong>Technology Sector:</strong> 15 lakh new jobs in software development, AI, and data analytics</li>
        <li><strong>Digital Services:</strong> 8 lakh positions in digital customer service and support</li>
        <li><strong>Infrastructure:</strong> 5 lakh jobs in network installation and maintenance</li>
        <li><strong>Training and Education:</strong> 2 lakh positions in digital literacy programs</li>
      </ol>

      <h3>International Recognition and Comparisons</h3>

      <p>The Digital India 2.0 initiative has garnered international attention, with several countries expressing interest in learning from India's digital transformation model. Estonia's e-Governance Academy has already signed an MoU to share best practices and collaborate on digital identity solutions.</p>

      <p>UN Secretary-General António Guterres praised the initiative, stating, "India's Digital India 2.0 represents a beacon of hope for developing nations seeking to bridge the digital divide and create inclusive growth opportunities for their citizens."</p>

      <h3>Conclusion and Next Steps</h3>

      <p>As India embarks on this transformative journey, the success of Digital India 2.0 will largely depend on effective implementation, stakeholder collaboration, and continuous adaptation to emerging technologies. The initiative represents more than just a policy framework—it embodies India's aspiration to become a global leader in digital governance and innovation.</p>

      <p>The next major milestone will be the launch of pilot programs in 50 districts across 10 states, scheduled to begin in April 2024. Citizens and stakeholders can track the progress through the official Digital India portal, which will provide real-time updates on implementation status and key metrics.</p>

      <p><em>This is a developing story. TheQuiverIndia will continue to provide updates as more information becomes available about the Digital India 2.0 implementation and its impact on citizens across the country.</em></p>
    `,
    multimedia: {
      videos: [
        {
          id: "video-1",
          url: "https://example.com/video1.mp4",
          thumbnail: "https://picsum.photos/seed/video1/400/300",
          duration: "5:23",
          title: "PM Modi's Full Speech"
        }
      ],
      gallery: [
        {
          id: "img-1",
          url: "https://picsum.photos/seed/gallery1/800/600",
          caption: "PM Modi addressing the gathering"
        },
        {
          id: "img-2", 
          url: "https://picsum.photos/seed/gallery2/800/600",
          caption: "Digital India 2.0 presentation"
        }
      ]
    }
  },
  {
    id: 2,
    title: "India Beats Australia by 6 Wickets in MCG Thriller",
    slug: "india-beats-australia-mcg-thriller",
    excerpt: "Virat Kohli's magnificent century leads India to a stunning victory at the Melbourne Cricket Ground in the Border-Gavaskar Trophy.",
    author: "Anil Kumar",
    category: "Cricket",
    tags: ["cricket", "india", "australia", "kohli", "mcg"],
    published_at: "2024-01-15T09:45:00Z",
    image: {
      src: "https://picsum.photos/seed/cricket-india-australia/1200/800",
      alt: "Virat Kohli celebrating his century at MCG"
    },
    reading_time: 4,
    views: 250000,
    shares: 5000,
    location: "Melbourne",
    region: "International",
    priority: "high",
    related_ids: [12, 20, 25],
    is_featured: true,
    is_breaking: true,
    sponsored: false,
    full_content: `
      <p>In a nail-biting finish at the iconic Melbourne Cricket Ground, Team India secured a remarkable 6-wicket victory over Australia, with Virat Kohli's masterful century proving to be the difference in a thrilling Border-Gavaskar Trophy encounter that will be remembered for years to come.</p>

      <p>Chasing a challenging target of 342 runs, India found themselves in early trouble at 45/3 before Kohli's arrival at the crease changed the complexion of the match entirely. The former captain, playing his 500th international match, displayed vintage form as he crafted a magnificent 118 not out off 119 balls.</p>

      <h3>Kohli's Masterclass Performance</h3>

      <p>"This innings ranks among the finest I've ever played," Kohli said during the post-match presentation. "The pressure was immense, but I drew inspiration from the thousands of Indian fans who traveled to Melbourne to support us."</p>

      <p>Kohli's innings was a study in controlled aggression, featuring 14 boundaries and 2 towering sixes. His partnership with wicket-keeper Rishabh Pant (67 not out) proved crucial, as the duo added an unbeaten 156 runs for the fifth wicket to guide India home with 2.3 overs to spare.</p>

      <h3>Australian Bowling Struggles</h3>

      <p>Despite setting a competitive total of 341/7 in their first innings, Australia's bowling attack struggled to contain the Indian batsmen on a pitch that seemed to ease out as the day progressed. Pat Cummins, the Australian captain, acknowledged the challenge posed by Kohli's exceptional batting.</p>

      <p>"Credit where it's due – that was a special innings from Virat. He absorbed the pressure early on and then accelerated beautifully. We had our chances, but he made us pay for every small mistake," Cummins reflected.</p>

      <h3>Series Implications</h3>

      <p>This victory gives India a 2-1 lead in the five-match series, putting them in a commanding position to retain the Border-Gavaskar Trophy. The win also strengthens India's position in the World Test Championship standings, keeping their qualification hopes alive for the final at Lord's.</p>

      <p>Former Indian captain MS Dhoni, who was present at the MCG as a special guest, praised the team's resilience. "This is what Test cricket is all about – showing character under pressure. The way Virat and Rishabh batted today reminded me of some of our greatest victories overseas."</p>

      <h3>Looking Ahead</h3>

      <p>The fourth Test of the series will commence at the Sydney Cricket Ground on January 3rd, with India needing just one more victory to secure the series. With momentum firmly on their side and key players in excellent form, India will be confident of achieving their third consecutive series victory in Australia.</p>

      <p>The victory also serves as perfect preparation for the upcoming home series against England, scheduled to begin in February, where India will look to continue their dominant run in Test cricket.</p>

      <h3>Match Statistics and Key Moments</h3>

      <p>The match witnessed several pivotal moments that shaped its outcome. Australia's first innings total of 341/7 was built around a brilliant 127 from Steve Smith and a crucial 89 from Travis Head. However, India's bowling attack, led by Jasprit Bumrah (4/78) and Mohammed Siraj (3/82), ensured that Australia couldn't cross the 350-mark.</p>

      <p>India's chase began disastrously with the loss of Rohit Sharma (8), Shubman Gill (12), and Cheteshwar Pujara (4) within the first 15 overs. At 45/3, the situation looked precarious, but Kohli's entry changed everything.</p>

      <p>The turning point came in the 28th over when Kohli launched Mitchell Starc for consecutive boundaries, signaling his intent to take the attack to the Australian bowlers. His partnership with Pant was a masterclass in Test cricket batting, combining patience with calculated aggression.</p>

      <h3>Statistical Breakdown</h3>

      <p>Kohli's innings featured some remarkable statistics:</p>

      <ul>
        <li><strong>Boundaries:</strong> 14 fours and 2 sixes in his unbeaten 118</li>
        <li><strong>Strike Rate:</strong> 99.16, exceptional for a Test match chase</li>
        <li><strong>Partnership:</strong> 156* runs with Pant for the 5th wicket</li>
        <li><strong>Milestone:</strong> His 29th Test century, equaling Sachin Tendulkar's away record</li>
        <li><strong>Conversion Rate:</strong> His 8th century in successful run chases</li>
      </ul>

      <h3>Australian Perspective and Analysis</h3>

      <p>Australian cricket legend Ricky Ponting, commentating for Channel 7, described Kohli's innings as "one of the finest exhibitions of Test match batting under pressure that I've witnessed in recent years."</p>

      <p>Former Australian captain Allan Border added, "What impressed me most was Kohli's patience early on. He absorbed the pressure, played the situation perfectly, and then accelerated when the time was right. That's the hallmark of a great player."</p>

      <p>The loss puts Australia in a difficult position, needing to win both remaining matches to retain the Border-Gavaskar Trophy. Captain Pat Cummins acknowledged the challenge ahead: "We know we're up against it now, but this team has shown resilience before. We'll regroup and come back stronger in Sydney."</p>

      <h3>Historical Context and Records</h3>

      <p>This victory continues India's remarkable overseas record under current captain Rohit Sharma. Since taking over the Test captaincy, India has won 8 out of 12 matches away from home, including series victories in England (2021) and Australia (2020-21).</p>

      <p>The win also extends India's impressive record at the MCG, where they have now won 3 out of their last 4 matches. This venue, once considered a fortress for Australia, has become increasingly favorable for visiting teams in recent years.</p>

      <h3>Fan Reactions and Social Media Buzz</h3>

      <p>The victory sparked massive celebrations among Indian cricket fans worldwide. Social media platforms were flooded with congratulatory messages, with #KohliCentury and #IndiaWins trending globally within hours of the match's conclusion.</p>

      <p>Former Indian captain Sourav Ganguly tweeted, "What a knock by @imVkohli! This is why he's called the chase master. Pressure brings out the best in champions, and today's innings was a perfect example."</p>

      <p>Cricket statistician Mohandas Menon noted that this was Kohli's 43rd century in successful run chases across all formats, the most by any batsman in cricket history.</p>

      <h3>What's Next for Both Teams</h3>

      <p>With a 2-1 lead in the series, India will head to Sydney with confidence but aware that complacency could be costly. The team management is likely to stick with the winning combination, though there might be considerations for resting key bowlers given the packed international schedule ahead.</p>

      <p>Australia, meanwhile, faces the prospect of losing the Border-Gavaskar Trophy for the third consecutive time. The team will need to address their batting vulnerabilities against spin bowling, which have been exposed throughout the series.</p>

      <p>The Sydney Cricket Ground, with its traditionally spin-friendly conditions, could play into India's hands, especially with Ravindra Jadeja and Ravichandran Ashwin in excellent form.</p>

      <p><em>Stay tuned to TheQuiverIndia for comprehensive coverage of the remaining matches in the Border-Gavaskar Trophy, including live updates, expert analysis, and exclusive interviews with players and cricket legends.</em></p>
    `,
    multimedia: {
      videos: [
        {
          id: "video-2",
          url: "https://example.com/cricket-highlights.mp4",
          thumbnail: "https://picsum.photos/seed/cricket-video/400/300",
          duration: "8:45",
          title: "Match Highlights"
        }
      ],
      gallery: []
    }
  },
  {
    id: 3,
    title: "Bollywood Star Deepika Padukone Announces Mental Health Foundation",
    slug: "deepika-padukone-mental-health-foundation",
    excerpt: "The acclaimed actress launches comprehensive mental health initiative targeting youth across India with focus on destigmatization.",
    author: "Priya Malhotra",
    category: "Bollywood",
    tags: ["bollywood", "deepika-padukone", "mental-health", "foundation"],
    published_at: "2024-01-15T08:30:00Z",
    image: {
      src: "https://picsum.photos/seed/deepika-foundation/1200/800",
      alt: "Deepika Padukone at foundation launch event"
    },
    reading_time: 5,
    views: 180000,
    shares: 3200,
    location: "Mumbai",
    region: "National",
    priority: "medium",
    related_ids: [8, 14, 19],
    is_featured: true,
    is_breaking: false,
    sponsored: false,
    full_content: `
      <p>Bollywood superstar Deepika Padukone today announced the launch of her comprehensive mental health foundation, marking a significant milestone in India's ongoing battle against mental health stigma. The announcement, made at a star-studded event in Mumbai, outlined an ambitious roadmap to address mental health challenges faced by young Indians across the country.</p>

      <p>The foundation, named "Live Love Laugh 2.0," represents an evolution of Padukone's earlier mental health advocacy work and comes with a commitment of ₹100 crores over the next five years to support various mental health initiatives across India.</p>

      <h3>Foundation's Core Objectives</h3>

      <p>"Mental health is not a luxury—it's a necessity," Padukone emphasized during her emotional 30-minute address. "Having personally battled depression, I understand the isolation and helplessness that millions of young Indians face daily. This foundation is my commitment to ensuring no one fights this battle alone."</p>

      <p>The foundation will focus on four key areas:</p>

      <ul>
        <li><strong>Awareness Campaigns:</strong> Nationwide programs to destigmatize mental health discussions</li>
        <li><strong>Accessible Treatment:</strong> Establishing 50 mental health clinics in tier-2 and tier-3 cities</li>
        <li><strong>Professional Training:</strong> Training 10,000 counselors and mental health professionals</li>
        <li><strong>Youth Programs:</strong> School and college-based mental health support systems</li>
      </ul>

      <h3>Celebrity Support and Industry Backing</h3>

      <p>The event witnessed unprecedented support from the Bollywood fraternity. Shah Rukh Khan, who attended as a special guest, shared his own experiences: "Deepika's courage in speaking about her struggles has inspired millions. This foundation will save lives and transform how we view mental health in India."</p>

      <p>Alia Bhatt, who recently became a mother, spoke about postpartum mental health: "The pressure on new mothers is immense, and mental health support during this phase is crucial. Deepika's foundation addresses these real-world challenges."</p>

      <p>Several major production houses, including Dharma Productions, Yash Raj Films, and Excel Entertainment, have committed to integrating mental health awareness into their upcoming projects.</p>

      <h3>Scientific Advisory Board</h3>

      <p>The foundation has assembled an impressive scientific advisory board comprising leading mental health experts from India and abroad. Dr. Vikram Patel, Professor of Global Health at Harvard Medical School, will serve as the Chief Scientific Advisor.</p>

      <p>"India faces a mental health crisis of unprecedented scale," Dr. Patel explained. "With over 200 million people affected by mental health disorders, initiatives like Deepika's foundation are not just welcome—they're essential for our nation's wellbeing."</p>

      <h3>Technology Integration and Innovation</h3>

      <p>The foundation will leverage cutting-edge technology to reach maximum people. A dedicated mobile app, developed in partnership with leading tech companies, will provide 24/7 mental health support in 12 Indian languages.</p>

      <p>Key technological features include:</p>

      <ol>
        <li><strong>AI-Powered Chatbots:</strong> Immediate support for crisis situations</li>
        <li><strong>Teletherapy Platform:</strong> Connecting users with certified therapists</li>
        <li><strong>Mood Tracking:</strong> Personal mental health monitoring tools</li>
        <li><strong>Community Support:</strong> Safe spaces for peer-to-peer support</li>
      </ol>

      <h3>Government Collaboration and Policy Impact</h3>

      <p>Union Health Minister Dr. Mansukh Mandaviya announced the government's full support for the initiative. "The Ministry of Health and Family Welfare will work closely with the foundation to integrate these programs into our existing healthcare infrastructure," he stated.</p>

      <p>The foundation's work will complement the government's National Mental Health Program, potentially influencing future policy decisions regarding mental health coverage and treatment accessibility.</p>

      <h3>International Recognition and Partnerships</h3>

      <p>The World Health Organization (WHO) has already expressed interest in collaborating with the foundation. Dr. Tedros Adhanom Ghebreyesus, WHO Director-General, sent a congratulatory message highlighting the foundation's potential global impact.</p>

      <p>International partnerships with organizations like the American Psychological Association and the UK's Mind charity will bring global best practices to Indian mental health care.</p>

      <h3>Personal Journey and Inspiration</h3>

      <p>Padukone's decision to expand her mental health advocacy stems from her personal journey with depression, which she first publicly discussed in 2015. Since then, she has become one of India's most prominent mental health advocates.</p>

      <p>"Six years ago, when I first spoke about my depression, the response was mixed. Today, I see young people openly discussing their mental health challenges. This change gives me hope and motivates me to do more," she reflected.</p>

      <p>The actress revealed that the foundation's programs are designed based on extensive research and feedback from over 10,000 young Indians who shared their mental health experiences through surveys and focus groups.</p>

      <h3>Implementation Timeline and Future Plans</h3>

      <p>The foundation will begin operations in March 2024, starting with pilot programs in Mumbai, Delhi, Bangalore, and Chennai. The full nationwide rollout is planned for completion by December 2025.</p>

      <p>Future plans include establishing a mental health research institute, launching a fellowship program for young mental health professionals, and creating India's first comprehensive mental health database to inform policy decisions.</p>

      <p><em>TheQuiverIndia will continue to follow this important initiative and provide updates on the foundation's progress and impact on India's mental health landscape.</em></p>
    `,
    multimedia: {
      videos: [],
      gallery: [
        {
          id: "img-3",
          url: "https://picsum.photos/seed/foundation-event/800/600",
          caption: "Foundation launch ceremony"
        }
      ]
    }
  },
  {
    id: 4,
    title: "Sensex Surges 800 Points on Strong Q3 Corporate Earnings",
    slug: "sensex-surges-q3-corporate-earnings",
    excerpt: "Indian stock markets witness massive rally as major companies report better-than-expected quarterly results, boosting investor confidence.",
    author: "Vikram Singh",
    category: "Economy",
    tags: ["sensex", "stock-market", "earnings", "economy"],
    published_at: "2024-01-15T07:45:00Z",
    image: {
      src: "https://picsum.photos/seed/sensex-rally/1200/800",
      alt: "BSE Sensex trading floor showing upward trends"
    },
    reading_time: 3,
    views: 95000,
    shares: 1200,
    location: "Mumbai",
    region: "National",
    priority: "medium",
    related_ids: [6, 11, 16],
    is_featured: false,
    is_breaking: false,
    sponsored: false,
    full_content: `
      <p>The BSE Sensex soared over 800 points in today's trading session, closing at 74,850.25, as Indian stock markets witnessed their biggest single-day gain in three months. The rally was driven by better-than-expected Q3 corporate earnings from major companies, with IT giants, banking stocks, and pharmaceutical companies leading the charge.</p>

      <p>The broader Nifty 50 index gained 245.30 points to close at 22,450.75, while the Bank Nifty surged 380.90 points to 48,750.20. Market capitalization increased by ₹4.2 lakh crores in a single day, reflecting strong investor confidence in India's economic fundamentals.</p>

      <h3>Corporate Earnings Drive Market Sentiment</h3>

      <p>"This rally is fundamentally driven by strong corporate performance across sectors," explained Nilesh Shah, Managing Director of Kotak Mahindra Asset Management. "Companies have not only met expectations but exceeded them significantly, particularly in the technology and banking sectors."</p>

      <p>Key earnings highlights that fueled the rally:</p>

      <ul>
        <li><strong>TCS:</strong> Reported 12.5% YoY revenue growth with strong deal pipeline</li>
        <li><strong>Infosys:</strong> Raised FY24 guidance citing robust demand in BFSI sector</li>
        <li><strong>HDFC Bank:</strong> Net profit jumped 23% with improved asset quality</li>
        <li><strong>Reliance Industries:</strong> Record quarterly profit driven by petrochemicals and retail</li>
        <li><strong>ITC:</strong> Strong performance across cigarettes and FMCG segments</li>
      </ul>

      <h3>Sector-wise Performance Analysis</h3>

      <p>The IT sector emerged as the biggest gainer, with the Nifty IT index surging 4.2%. Tata Consultancy Services (TCS) led the charge with a 6.8% gain, followed by Infosys (+5.4%) and HCL Technologies (+4.9%).</p>

      <p>Banking stocks also performed exceptionally well, with HDFC Bank (+4.2%), ICICI Bank (+3.8%), and State Bank of India (+3.5%) contributing significantly to the Sensex gains.</p>

      <p>Pharmaceutical companies showed strong momentum, with Dr. Reddy's Laboratories (+5.2%) and Sun Pharmaceutical (+4.1%) leading the sector gains on hopes of improved US market performance.</p>

      <h3>Foreign Investment Flows and Global Factors</h3>

      <p>Foreign Institutional Investors (FIIs) turned net buyers after three consecutive sessions of selling, pumping in ₹2,847 crores into Indian equities. This shift in sentiment was attributed to positive commentary from global rating agencies about India's growth prospects.</p>

      <p>Moody's Analytics released a report stating that India's economy is positioned for sustained growth, with GDP expansion expected to outpace global averages. This positive outlook has attracted renewed foreign investor interest.</p>

      <h3>Expert Commentary and Market Outlook</h3>

      <p>Market veteran Rakesh Jhunjhunwala's investment firm, RARE Enterprises, increased its exposure to Indian equities, signaling confidence in the market's long-term prospects. "The fundamentals of Indian companies have never been stronger," noted Utpal Sheth, CEO of RARE Enterprises.</p>

      <p>Global investment bank Goldman Sachs raised its Sensex target to 78,000 for 2024, citing strong corporate earnings growth and improving macroeconomic indicators.</p>

      <h3>Rupee Strengthens Against Dollar</h3>

      <p>The Indian rupee also participated in the positive momentum, strengthening 45 paise against the US dollar to close at 82.15. This appreciation was supported by strong equity inflows and improved current account dynamics.</p>

      <p>Currency analysts expect the rupee to remain stable in the near term, with the Reserve Bank of India's foreign exchange reserves providing adequate cushion against global volatility.</p>

      <h3>Retail Investor Participation</h3>

      <p>Retail investor participation reached new highs, with over 2.5 crore demat accounts actively trading during the session. Systematic Investment Plan (SIP) inflows into mutual funds touched a record ₹16,800 crores in December, reflecting growing retail confidence.</p>

      <p>Zerodha, India's largest retail brokerage, reported a 40% increase in daily active users compared to the previous month, indicating sustained retail interest in equity markets.</p>

      <h3>Looking Ahead: Factors to Watch</h3>

      <p>Market participants will closely monitor several key factors in the coming weeks:</p>

      <ol>
        <li><strong>Q3 Earnings Season:</strong> Results from remaining Nifty 50 companies</li>
        <li><strong>Budget 2024:</strong> Government's fiscal policy and reform announcements</li>
        <li><strong>Global Cues:</strong> US Federal Reserve policy decisions and global growth outlook</li>
        <li><strong>Monsoon Predictions:</strong> Early forecasts for the upcoming agricultural season</li>
      </ol>

      <p>Technical analysts suggest that sustained momentum above 75,000 could propel the Sensex toward its next psychological target of 80,000, provided global conditions remain supportive.</p>

      <p><em>Stay tuned to TheQuiverIndia for live market updates, expert analysis, and comprehensive coverage of India's financial markets and economic developments.</em></p>
    `,
    multimedia: {
      videos: [],
      gallery: []
    }
  },
  {
    id: 5,
    title: "Tamil Nadu Launches Revolutionary Green Energy Project",
    slug: "tamil-nadu-green-energy-project",
    excerpt: "State government unveils massive renewable energy initiative targeting 50% green power by 2027, creating 100,000 jobs.",
    author: "Meera Krishnan",
    category: "Regional",
    tags: ["tamil-nadu", "green-energy", "renewable", "jobs"],
    published_at: "2024-01-14T16:30:00Z",
    image: {
      src: "https://picsum.photos/seed/tn-green-energy/1200/800",
      alt: "Solar panels and wind turbines in Tamil Nadu"
    },
    reading_time: 7,
    views: 75000,
    shares: 900,
    location: "Chennai",
    region: "South India",
    priority: "medium",
    related_ids: [13, 17, 22],
    is_featured: true,
    is_breaking: false,
    sponsored: false,
    full_content: `
      <p>The Tamil Nadu government today launched an ambitious green energy project that promises to revolutionize the state's power sector and establish it as India's renewable energy capital. Chief Minister M.K. Stalin unveiled the comprehensive ₹75,000 crore initiative at a grand ceremony in Chennai, outlining plans to achieve 50% green power generation by 2027 while creating over 100,000 direct and indirect employment opportunities.</p>

      <p>The mega project, officially named "Tamil Nadu Green Energy Mission 2030," represents the largest single investment in renewable energy by any Indian state and positions Tamil Nadu as a pioneer in sustainable development and climate action.</p>

      <h3>Project Components and Scale</h3>

      <p>"Today marks a historic moment for Tamil Nadu and India's fight against climate change," CM Stalin declared before a gathering of 5,000 people, including international investors, environmental experts, and renewable energy industry leaders. "This project will not only meet our energy needs but also create a sustainable future for generations to come."</p>

      <p>The comprehensive initiative encompasses multiple renewable energy sources:</p>

      <ul>
        <li><strong>Solar Power:</strong> 15,000 MW capacity across 25 districts with floating solar farms on water bodies</li>
        <li><strong>Wind Energy:</strong> 10,000 MW additional capacity leveraging Tamil Nadu's coastal wind corridors</li>
        <li><strong>Offshore Wind:</strong> 5,000 MW from India's first major offshore wind installations</li>
        <li><strong>Pumped Hydro Storage:</strong> 3,000 MW storage capacity for grid stability</li>
        <li><strong>Green Hydrogen:</strong> 500 MW electrolyzer capacity for industrial applications</li>
      </ul>

      <h3>Economic Impact and Investment Details</h3>

      <p>The project has attracted significant international investment, with major global players committing substantial funds. Adani Green Energy will invest ₹25,000 crores in solar installations, while ReNew Power has committed ₹18,000 crores for wind energy development.</p>

      <p>International participation includes partnerships with Danish wind energy giant Ørsted (₹12,000 crores), German solar technology firm SolarWorld (₹8,000 crores), and Norwegian renewable energy company Equinor (₹7,000 crores).</p>

      <p>The economic benefits extend far beyond energy generation:</p>

      <ol>
        <li><strong>Direct Employment:</strong> 60,000 jobs in manufacturing, installation, and maintenance</li>
        <li><strong>Indirect Employment:</strong> 40,000 jobs in supporting industries and services</li>
        <li><strong>Skill Development:</strong> Training programs for 25,000 youth in renewable energy technologies</li>
        <li><strong>Industrial Growth:</strong> Attraction of energy-intensive industries due to cheaper green power</li>
        <li><strong>Export Potential:</strong> Green hydrogen and renewable energy equipment manufacturing for export</li>
      </ol>

      <h3>Environmental Benefits and Climate Impact</h3>

      <p>Environmental scientist Dr. Sunita Narain, Director General of the Centre for Science and Environment, praised the initiative's environmental credentials. "Tamil Nadu's green energy mission could prevent 50 million tonnes of CO2 emissions annually, equivalent to taking 10 million cars off the road permanently."</p>

      <p>The project's environmental impact includes:</p>

      <ul>
        <li><strong>Carbon Reduction:</strong> 200 million tonnes CO2 savings over 10 years</li>
        <li><strong>Air Quality:</strong> Significant improvement in industrial areas</li>
        <li><strong>Water Conservation:</strong> Reduced water usage in power generation</li>
        <li><strong>Land Restoration:</strong> Rehabilitation of degraded lands for solar installations</li>
      </ul>

      <h3>Technological Innovation and Research</h3>

      <p>The mission includes establishment of three world-class renewable energy research centers in Chennai, Coimbatore, and Madurai. These centers will focus on developing indigenous technologies and reducing dependence on imported equipment.</p>

      <p>IIT Madras will lead the research consortium, with Professor Ashok Jhunjhunwala heading the green hydrogen research division. "Our goal is to develop cost-effective, scalable solutions that can be replicated across India and other developing nations," he explained.</p>

      <h3>Industry Response and Market Impact</h3>

      <p>The announcement has been welcomed enthusiastically by the renewable energy industry. Gautam Adani, Chairman of Adani Group, stated, "Tamil Nadu's visionary approach creates a perfect ecosystem for renewable energy growth. We're proud to be part of this transformative journey."</p>

      <p>Stock markets responded positively, with renewable energy stocks surging up to 15% following the announcement. Analysts predict that the project could trigger similar initiatives in other states, potentially accelerating India's renewable energy transition.</p>

      <h3>Challenges and Implementation Strategy</h3>

      <p>Despite the enthusiasm, experts have identified several implementation challenges. Land acquisition for large-scale solar installations, grid integration complexities, and skilled workforce development remain key areas requiring careful planning.</p>

      <p>The state government has developed a phased implementation approach:</p>

      <ol>
        <li><strong>Phase 1 (2024-2025):</strong> Solar installations and wind farm expansions in 10 districts</li>
        <li><strong>Phase 2 (2025-2027):</strong> Offshore wind development and storage system deployment</li>
        <li><strong>Phase 3 (2027-2030):</strong> Green hydrogen production and industrial integration</li>
      </ol>

      <h3>Community Impact and Social Benefits</h3>

      <p>The project emphasizes community participation and social development. Revenue-sharing agreements with local communities, priority employment for local youth, and infrastructure development in project areas are key components of the social impact strategy.</p>

      <p>Women's self-help groups will be involved in solar panel maintenance and cleaning operations, providing sustainable livelihood opportunities for rural women. The project is expected to benefit over 2 million people directly through employment and community development programs.</p>

      <h3>International Recognition and Partnerships</h3>

      <p>The International Renewable Energy Agency (IRENA) has designated Tamil Nadu's green energy mission as a model project for developing nations. Director-General Francesco La Camera will visit Chennai next month to study the implementation methodology.</p>

      <p>The project has also attracted attention from climate finance institutions, with the Green Climate Fund approving a $500 million concessional loan to support the initiative's implementation.</p>

      <h3>Future Vision and Long-term Goals</h3>

      <p>Beyond 2030, Tamil Nadu envisions becoming a net exporter of green energy to neighboring states and potentially to international markets through green hydrogen exports. The state aims to establish itself as a global hub for renewable energy manufacturing and technology development.</p>

      <p>CM Stalin concluded his address with a vision statement: "Tamil Nadu will show the world that economic growth and environmental protection can go hand in hand. Our green energy mission is not just about power generation—it's about powering a sustainable future for all."</p>

      <p><em>TheQuiverIndia will provide continuous coverage of this landmark project, including regular updates on implementation progress, environmental impact assessments, and community development outcomes.</em></p>
    `,
    multimedia: {
      videos: [
        {
          id: "video-3",
          url: "https://example.com/green-energy.mp4",
          thumbnail: "https://picsum.photos/seed/green-video/400/300",
          duration: "6:12",
          title: "Green Energy Project Overview"
        }
      ],
      gallery: []
    }
  },
  {
    id: 6,
    title: "Indian Space Mission to Venus Gets Cabinet Approval",
    slug: "isro-venus-mission-cabinet-approval",
    excerpt: "ISRO's ambitious Shukrayaan-1 mission receives government nod with ₹2,500 crore budget allocation for 2028 launch.",
    author: "Dr. Kiran Rao",
    category: "Science",
    tags: ["isro", "venus", "space-mission", "science"],
    published_at: "2024-01-14T15:00:00Z",
    image: {
      src: "https://picsum.photos/seed/isro-venus/1200/800",
      alt: "ISRO scientists working on Venus mission spacecraft"
    },
    reading_time: 8,
    views: 150000,
    shares: 2800,
    location: "Bangalore",
    region: "National",
    priority: "high",
    related_ids: [4, 21, 24],
    is_featured: true,
    is_breaking: false,
    sponsored: false,
    full_content: `
      <p>In a significant milestone for India's space program, the Cabinet has approved ISRO's ambitious Venus mission, officially designated as Shukrayaan-1, with a budget allocation of ₹2,500 crores for a planned launch in 2028. This groundbreaking mission will make India only the fourth nation to successfully send a spacecraft to Venus, following the Soviet Union, United States, and Japan.</p>

      <p>The announcement was made by Union Minister Dr. Jitendra Singh at a press conference in New Delhi, attended by ISRO Chairman S. Somanath and leading space scientists from across the country. The mission represents India's most ambitious interplanetary exploration project to date.</p>

      <h3>Mission Objectives and Scientific Goals</h3>

      <p>"Shukrayaan-1 will unlock the mysteries of Venus, our closest planetary neighbor, and contribute significantly to our understanding of planetary evolution and climate change," explained Dr. Somanath during the detailed mission briefing.</p>

      <p>The mission's primary scientific objectives include:</p>

      <ul>
        <li><strong>Atmospheric Studies:</strong> Analyzing Venus's thick atmosphere and greenhouse effect mechanisms</li>
        <li><strong>Surface Mapping:</strong> High-resolution imaging of Venus's surface through cloud penetration</li>
        <li><strong>Climate Research:</strong> Understanding extreme climate conditions and their implications for Earth</li>
        <li><strong>Geological Analysis:</strong> Studying volcanic activity and surface composition</li>
        <li><strong>Magnetic Field:</strong> Investigating Venus's unique magnetic field characteristics</li>
      </ul>

      <h3>Spacecraft Design and Technology</h3>

      <p>The Shukrayaan-1 spacecraft will be equipped with 13 advanced scientific instruments, including several developed indigenously by ISRO's research centers. The spacecraft weighs approximately 2,500 kg and will be launched using ISRO's powerful GSLV Mk III rocket.</p>

      <p>Key technological innovations include:</p>

      <ol>
        <li><strong>Heat-Resistant Design:</strong> Withstanding temperatures up to 500°C on Venus's surface</li>
        <li><strong>Advanced Radar:</strong> Penetrating Venus's thick atmosphere for surface imaging</li>
        <li><strong>Spectrometers:</strong> Analyzing atmospheric composition and chemical processes</li>
        <li><strong>Communication Systems:</strong> Maintaining contact across 261 million kilometers</li>
      </ol>

      <h3>International Collaboration and Partnerships</h3>

      <p>The mission involves significant international collaboration, with NASA providing Deep Space Network support for communication and the European Space Agency (ESA) contributing specialized instruments for atmospheric analysis.</p>

      <p>Dr. Thomas Zurbuchen, former NASA Associate Administrator, praised the collaboration: "ISRO's Venus mission represents the best of international space cooperation. The data collected will benefit all of humanity's understanding of planetary science."</p>

      <p>France's CNES (National Centre for Space Studies) is providing the VIRAL (Venus Infrared Atmospheric Gases Linker) instrument, while Germany's DLR is contributing advanced radar technology.</p>

      <h3>Economic and Strategic Implications</h3>

      <p>The mission's approval is expected to boost India's space economy significantly. Industry analysts predict that the project will generate over 15,000 direct and indirect jobs in the aerospace sector and attract international investments worth ₹5,000 crores.</p>

      <p>Strategic benefits include:</p>

      <ul>
        <li><strong>Technology Development:</strong> Advancement in heat-resistant materials and deep space communication</li>
        <li><strong>Industrial Growth:</strong> Expansion of India's space manufacturing capabilities</li>
        <li><strong>Global Positioning:</strong> Establishing India as a major player in interplanetary exploration</li>
        <li><strong>Scientific Leadership:</strong> Contributing to global climate and planetary research</li>
      </ul>

      <h3>Challenges and Risk Mitigation</h3>

      <p>Venus missions are notoriously difficult, with a success rate of less than 50% historically. ISRO has developed comprehensive risk mitigation strategies, including extensive ground testing and simulation programs.</p>

      <p>Dr. K. Radhakrishnan, former ISRO Chairman, emphasized the challenges: "Venus is often called Earth's evil twin due to its extreme conditions. Success requires meticulous planning, robust engineering, and innovative solutions to unprecedented challenges."</p>

      <h3>Timeline and Mission Phases</h3>

      <p>The mission development will proceed through carefully planned phases:</p>

      <ol>
        <li><strong>2024-2025:</strong> Spacecraft assembly and instrument integration</li>
        <li><strong>2026-2027:</strong> Extensive testing and launch preparations</li>
        <li><strong>2028:</strong> Launch window during optimal Earth-Venus alignment</li>
        <li><strong>2029-2032:</strong> Mission operations and data collection</li>
      </ol>

      <h3>Scientific Community Response</h3>

      <p>The international scientific community has welcomed India's Venus mission with enthusiasm. Dr. Suzanne Smrekar, Principal Investigator for NASA's VERITAS mission, stated, "ISRO's mission will provide crucial complementary data to our ongoing Venus research. This is exactly the kind of international cooperation that advances planetary science."</p>

      <p>The Indian scientific community is equally excited. Professor U.R. Rao, former ISRO Chairman, described the mission as "a testament to India's growing capabilities in space exploration and our commitment to pushing the boundaries of human knowledge."</p>

      <h3>Public Interest and Educational Impact</h3>

      <p>The mission has generated significant public interest, with ISRO planning extensive educational outreach programs. Schools and colleges across India will be connected to mission control during key phases, inspiring the next generation of space scientists.</p>

      <p>A dedicated Venus mission app will provide real-time updates, educational content, and interactive features for space enthusiasts. The mission is expected to inspire thousands of students to pursue careers in space science and technology.</p>

      <p><em>TheQuiverIndia will provide comprehensive coverage of the Shukrayaan-1 mission, from development phases through launch and operations, bringing you exclusive insights from ISRO scientists and international space experts.</em></p>
    `,
    multimedia: {
      videos: [],
      gallery: [
        {
          id: "img-4",
          url: "https://picsum.photos/seed/isro-lab/800/600",
          caption: "ISRO scientists at work"
        }
      ]
    }
  },
  {
    id: 7,
    title: "Rajasthan Desert Festival Showcases Rich Cultural Heritage",
    slug: "rajasthan-desert-festival-cultural-heritage",
    excerpt: "Three-day extravaganza in Jaisalmer attracts international tourists with traditional music, dance, and camel races.",
    author: "Amit Sharma",
    category: "Culture",
    tags: ["rajasthan", "festival", "culture", "tourism"],
    published_at: "2024-01-14T14:00:00Z",
    image: {
      src: "https://picsum.photos/seed/rajasthan-festival/1200/800",
      alt: "Dancers performing at Rajasthan Desert Festival"
    },
    reading_time: 4,
    views: 68000,
    shares: 1500,
    location: "Jaisalmer",
    region: "North India",
    priority: "low",
    related_ids: [9, 23, 26],
    is_featured: false,
    is_breaking: false,
    sponsored: false,
    full_content: "The annual Rajasthan Desert Festival kicked off in the golden city of Jaisalmer...",
    multimedia: {
      videos: [],
      gallery: []
    }
  },
  {
    id: 8,
    title: "Army Successfully Tests New Indigenous Drone Technology",
    slug: "army-tests-indigenous-drone-technology",
    excerpt: "Indian Army conducts successful trials of domestically developed surveillance drones along China border, boosting Make in India.",
    author: "Colonel Ravi Shankar (Retd.)",
    category: "Defence",
    tags: ["army", "drone", "indigenous", "china-border", "make-in-india"],
    published_at: "2024-01-14T13:15:00Z",
    image: {
      src: "https://picsum.photos/seed/army-drone/1200/800",
      alt: "Indian Army drone during testing operations"
    },
    reading_time: 6,
    views: 110000,
    shares: 1800,
    location: "Ladakh",
    region: "National",
    priority: "high",
    related_ids: [1, 15, 20],
    is_featured: false,
    is_breaking: false,
    sponsored: false,
    full_content: "The Indian Army has successfully tested a new generation of indigenous surveillance drones...",
    multimedia: {
      videos: [],
      gallery: []
    }
  }
]

const mockBreakingNews = [
  {
    id: "breaking-1",
    headline: "🔴 LIVE: India wins Cricket World Cup Final by 7 wickets",
    url: "/cricket/india-wins-world-cup-final",
    published_at: "2024-01-15T12:30:00Z",
    priority: "critical",
    category: "Cricket"
  },
  {
    id: "breaking-2", 
    headline: "🚨 BREAKING: Supreme Court delivers historic verdict on Article 370",
    url: "/national/supreme-court-article-370-verdict",
    published_at: "2024-01-15T12:15:00Z",
    priority: "high",
    category: "National"
  },
  {
    id: "breaking-3",
    headline: "⚡ ALERT: Cyclone Biparjoy approaches Gujarat coast, NDRF deployed",
    url: "/regional/cyclone-biparjoy-gujarat-alert",
    published_at: "2024-01-15T12:00:00Z",
    priority: "high", 
    category: "Regional"
  },
  {
    id: "breaking-4",
    headline: "📈 Sensex crosses 75,000 for first time, rupee strengthens",
    url: "/economy/sensex-75000-milestone",
    published_at: "2024-01-15T11:45:00Z",
    priority: "medium",
    category: "Economy"
  }
]

// Mock trending topics data
const mockTrendingTopics = [
  { id: 1, topic: "#DigitalIndia2", count: 125000, trend: "up" },
  { id: 2, topic: "#CricketWorldCup", count: 250000, trend: "up" },
  { id: 3, topic: "#Budget2024", count: 98000, trend: "stable" },
  { id: 4, topic: "#ClimateAction", count: 75000, trend: "up" },
  { id: 5, topic: "#StartupIndia", count: 45000, trend: "down" },
  { id: 6, topic: "#VocalForLocal", count: 62000, trend: "up" },
  { id: 7, topic: "#SkillIndia", count: 38000, trend: "stable" },
  { id: 8, topic: "#SwachhBharat", count: 55000, trend: "up" }
]

// Mock live updates data
const mockLiveUpdates = [
  {
    id: "live-1",
    time: "14:30",
    update: "PM Modi addresses nation on Digital India 2.0",
    category: "National",
    priority: "high"
  },
  {
    id: "live-2", 
    time: "14:15",
    update: "India 287/4, chasing 342 in World Cup Final",
    category: "Cricket",
    priority: "critical"
  },
  {
    id: "live-3",
    time: "14:00",
    update: "Sensex gains 500 points in opening session",
    category: "Economy", 
    priority: "medium"
  },
  {
    id: "live-4",
    time: "13:45",
    update: "Tamil Nadu announces ₹1000 crore flood relief package",
    category: "Regional",
    priority: "high"
  }
]

// Mock stock market data
const mockStockData = {
  sensex: {
    value: 74850.25,
    change: +825.40,
    changePercent: +1.12,
    trend: "up"
  },
  nifty: {
    value: 22450.75, 
    change: +245.30,
    changePercent: +1.10,
    trend: "up"
  },
  bankNifty: {
    value: 48750.20,
    change: +380.90,
    changePercent: +0.79,
    trend: "up"
  },
  lastUpdated: "2024-01-15T14:30:00Z"
}

// Mock weather data for major Indian cities
const mockWeatherData = {
  "delhi": {
    city: "New Delhi",
    state: "Delhi",
    temperature: 28,
    condition: "Partly Cloudy",
    humidity: 65,
    windSpeed: 12,
    visibility: 8,
    uvIndex: 6,
    pressure: 1013,
    icon: "partly-cloudy",
    forecast: [
      { day: "Today", high: 32, low: 18, condition: "Partly Cloudy", icon: "partly-cloudy" },
      { day: "Tomorrow", high: 30, low: 16, condition: "Sunny", icon: "sunny" },
      { day: "Wed", high: 28, low: 15, condition: "Cloudy", icon: "cloudy" }
    ]
  },
  "mumbai": {
    city: "Mumbai", 
    state: "Maharashtra",
    temperature: 31,
    condition: "Humid",
    humidity: 78,
    windSpeed: 15,
    visibility: 6,
    uvIndex: 8,
    pressure: 1009,
    icon: "humid",
    forecast: [
      { day: "Today", high: 33, low: 24, condition: "Humid", icon: "humid" },
      { day: "Tomorrow", high: 32, low: 23, condition: "Partly Cloudy", icon: "partly-cloudy" },
      { day: "Wed", high: 31, low: 22, condition: "Rainy", icon: "rainy" }
    ]
  },
  "bangalore": {
    city: "Bangalore",
    state: "Karnataka",
    temperature: 24,
    condition: "Pleasant",
    humidity: 60,
    windSpeed: 8,
    visibility: 10,
    uvIndex: 5,
    pressure: 1016,
    icon: "sunny",
    forecast: [
      { day: "Today", high: 27, low: 19, condition: "Pleasant", icon: "sunny" },
      { day: "Tomorrow", high: 26, low: 18, condition: "Partly Cloudy", icon: "partly-cloudy" },
      { day: "Wed", high: 25, low: 17, condition: "Cloudy", icon: "cloudy" }
    ]
  },
  "chennai": {
    city: "Chennai",
    state: "Tamil Nadu",
    temperature: 33,
    condition: "Hot",
    humidity: 72,
    windSpeed: 18,
    visibility: 7,
    uvIndex: 9,
    pressure: 1008,
    icon: "hot",
    forecast: [
      { day: "Today", high: 36, low: 26, condition: "Hot", icon: "hot" },
      { day: "Tomorrow", high: 35, low: 25, condition: "Partly Cloudy", icon: "partly-cloudy" },
      { day: "Wed", high: 34, low: 24, condition: "Thunderstorms", icon: "stormy" }
    ]
  },
  "kolkata": {
    city: "Kolkata",
    state: "West Bengal", 
    temperature: 29,
    condition: "Humid",
    humidity: 80,
    windSpeed: 10,
    visibility: 6,
    uvIndex: 7,
    pressure: 1010,
    icon: "humid",
    forecast: [
      { day: "Today", high: 32, low: 24, condition: "Humid", icon: "humid" },
      { day: "Tomorrow", high: 31, low: 23, condition: "Rainy", icon: "rainy" },
      { day: "Wed", high: 30, low: 22, condition: "Thunderstorms", icon: "stormy" }
    ]
  },
  "hyderabad": {
    city: "Hyderabad",
    state: "Telangana",
    temperature: 30,
    condition: "Clear",
    humidity: 55,
    windSpeed: 14,
    visibility: 9,
    uvIndex: 8,
    pressure: 1012,
    icon: "sunny",
    forecast: [
      { day: "Today", high: 34, low: 22, condition: "Clear", icon: "sunny" },
      { day: "Tomorrow", high: 33, low: 21, condition: "Partly Cloudy", icon: "partly-cloudy" },
      { day: "Wed", high: 32, low: 20, condition: "Sunny", icon: "sunny" }
    ]
  },
  "pune": {
    city: "Pune",
    state: "Maharashtra",
    temperature: 26,
    condition: "Pleasant",
    humidity: 58,
    windSpeed: 11,
    visibility: 9,
    uvIndex: 6,
    pressure: 1014,
    icon: "partly-cloudy",
    forecast: [
      { day: "Today", high: 29, low: 20, condition: "Pleasant", icon: "partly-cloudy" },
      { day: "Tomorrow", high: 28, low: 19, condition: "Sunny", icon: "sunny" },
      { day: "Wed", high: 27, low: 18, condition: "Cloudy", icon: "cloudy" }
    ]
  },
  "ahmedabad": {
    city: "Ahmedabad",
    state: "Gujarat",
    temperature: 32,
    condition: "Hot",
    humidity: 45,
    windSpeed: 16,
    visibility: 8,
    uvIndex: 9,
    pressure: 1011,
    icon: "hot",
    forecast: [
      { day: "Today", high: 37, low: 23, condition: "Hot", icon: "hot" },
      { day: "Tomorrow", high: 36, low: 22, condition: "Sunny", icon: "sunny" },
      { day: "Wed", high: 35, low: 21, condition: "Partly Cloudy", icon: "partly-cloudy" }
    ]
  }
}

// Date formatting utility to ensure consistency
function formatDate(dateString, options = {}) {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    ...options
  })
}

export async function fetchFeaturedArticles() {
  try {
    const response = await articlesAPI.getFeatured(10)
    if (response.success && response.data) {
      // Transform API data to match frontend format
      return response.data.map(article => ({
        id: article._id,
        title: article.title,
        slug: article.slug,
        excerpt: article.excerpt,
        author: article.author?.name || 'Unknown',
        category: article.category?.name || 'Uncategorized',
        tags: article.tags || [],
        published_at: article.publishedAt || article.createdAt,
        image: article.image?.url ? { src: article.image.url, alt: article.image.alt || article.title } : { src: 'https://picsum.photos/1200/800', alt: article.title },
        reading_time: article.readingTime || 5,
        views: article.views || 0,
        shares: article.shares || 0,
        location: article.location || '',
        region: article.region || '',
        priority: article.priority || 'medium',
        is_featured: article.isFeatured || false,
        is_breaking: article.isBreaking || false,
        full_content: article.content || ''
      }))
    }
  } catch (error) {
    console.error('Error fetching featured articles:', error)
  }
  
  // Fallback to mock data
  return mockArticles
}

export async function fetchBreakingNews() {
  try {
    const response = await articlesAPI.getAll({ 
      isBreaking: true, 
      limit: 5,
      sortBy: '-publishedAt'
    })
    if (response.success && response.data?.articles) {
      return response.data.articles.map(article => ({
        id: `breaking-${article._id}`,
        headline: article.title,
        slug: article.slug,
        url: `/article/${article.slug}`,
        published_at: article.publishedAt || article.createdAt,
        priority: article.priority || 'high',
        category: article.category?.name || 'News'
      }))
    }
  } catch (error) {
    console.error('Error fetching breaking news:', error)
  }
  
  // Fallback to mock data
  return mockBreakingNews
}

export async function fetchArticleBySlug(slug) {
  try {
    const response = await articlesAPI.getBySlug(slug)
    if (response.success && response.data) {
      const apiArticle = response.data.article || response.data
      
      // Transform to frontend format
      const article = {
        id: apiArticle._id,
        title: apiArticle.title,
        slug: apiArticle.slug,
        excerpt: apiArticle.excerpt,
        author: apiArticle.author?.name || 'Unknown',
        category: apiArticle.category?.name || 'Uncategorized',
        tags: apiArticle.tags || [],
        published_at: apiArticle.publishedAt || apiArticle.createdAt,
        image: apiArticle.image?.url ? { src: apiArticle.image.url, alt: apiArticle.image.alt || apiArticle.title } : { src: 'https://picsum.photos/1200/800', alt: apiArticle.title },
        reading_time: apiArticle.readingTime || 5,
        views: apiArticle.views || 0,
        shares: apiArticle.shares || 0,
        location: apiArticle.location || '',
        region: apiArticle.region || '',
        priority: apiArticle.priority || 'medium',
        is_featured: apiArticle.isFeatured || false,
        is_breaking: apiArticle.isBreaking || false,
        full_content: apiArticle.content || '',
        related_ids: apiArticle.relatedArticles || []
      }

      const author_info = {
        name: apiArticle.author?.name || article.author,
        bio: apiArticle.author?.bio || `${article.author} is a senior correspondent covering ${article.category.toLowerCase()}.`,
        avatar: apiArticle.author?.avatar || `https://picsum.photos/seed/${article.author.toLowerCase().replace(' ', '-')}/200/200`,
        social_links: apiArticle.author?.socialLinks || {
          twitter: `@${article.author.toLowerCase().replace(' ', '')}`,
          linkedin: `/in/${article.author.toLowerCase().replace(' ', '-')}`
        }
      }

      const related_articles = (response.data.relatedArticles || []).map(rel => ({
        id: rel._id,
        title: rel.title,
        slug: rel.slug,
        excerpt: rel.excerpt,
        image: rel.image,
        reading_time: rel.readingTime || 5
      }))

      return {
        article,
        related_articles,
        author_info
      }
    }
  } catch (error) {
    console.error('Error fetching article by slug:', error)
  }
  
  // Fallback to mock data
  const article = mockArticles.find(a => a.slug === slug)
  if (!article) {
    throw new Error('Article not found')
  }

  const relatedArticles = mockArticles
    .filter(a => article.related_ids.includes(a.id))
    .slice(0, 3)

  return {
    article,
    related_articles: relatedArticles,
    author_info: {
      name: article.author,
      bio: `${article.author} is a senior correspondent covering ${article.category.toLowerCase()}.`,
      avatar: `https://picsum.photos/seed/${article.author.toLowerCase().replace(' ', '-')}/200/200`,
      social_links: {
        twitter: `@${article.author.toLowerCase().replace(' ', '')}`,
        linkedin: `/in/${article.author.toLowerCase().replace(' ', '-')}`
      }
    }
  }
}

export async function fetchArticlesByCategory(category, page = 1, perPage = 12) {
  try {
    const response = await categoriesAPI.getArticles(category.toLowerCase(), {
      page,
      limit: perPage
    })
    
    if (response.success && response.data) {
      const articles = (response.data.articles || []).map(article => ({
        id: article._id,
        title: article.title,
        slug: article.slug,
        excerpt: article.excerpt,
        author: article.author?.name || 'Unknown',
        category: article.category?.name || category,
        tags: article.tags || [],
        published_at: article.publishedAt || article.createdAt,
        image: article.image?.url ? { src: article.image.url, alt: article.image.alt || article.title } : { src: 'https://picsum.photos/1200/800', alt: article.title },
        reading_time: article.readingTime || 5,
        views: article.views || 0,
        shares: article.shares || 0
      }))

      return {
        articles,
        pagination: {
          page: response.data.pagination?.page || page,
          per_page: response.data.pagination?.limit || perPage,
          total: response.data.pagination?.total || articles.length,
          total_pages: response.data.pagination?.totalPages || 1,
          has_next: response.data.pagination?.hasNext || false,
          has_prev: response.data.pagination?.hasPrev || false
        }
      }
    }
  } catch (error) {
    console.error('Error fetching articles by category:', error)
  }
  
  // Fallback to mock data
  const filteredArticles = mockArticles.filter(a => a.category === category)
  const startIndex = (page - 1) * perPage
  const endIndex = startIndex + perPage
  const paginatedArticles = filteredArticles.slice(startIndex, endIndex)

  return {
    articles: paginatedArticles,
    pagination: {
      page,
      per_page: perPage,
      total: filteredArticles.length,
      total_pages: Math.ceil(filteredArticles.length / perPage),
      has_next: endIndex < filteredArticles.length,
      has_prev: page > 1
    }
  }
}

export async function searchArticles(query, page = 1, perPage = 12) {
  try {
    const response = await articlesAPI.search(query, { page, limit: perPage })
    
    if (response.success && response.data) {
      const articles = (response.data.articles || []).map(article => ({
        id: article._id,
        title: article.title,
        slug: article.slug,
        excerpt: article.excerpt,
        author: article.author?.name || 'Unknown',
        category: article.category?.name || 'Uncategorized',
        tags: article.tags || [],
        published_at: article.publishedAt || article.createdAt,
        image: article.image?.url ? { src: article.image.url, alt: article.image.alt || article.title } : { src: 'https://picsum.photos/1200/800', alt: article.title },
        reading_time: article.readingTime || 5,
        views: article.views || 0,
        shares: article.shares || 0
      }))

      return {
        articles,
        pagination: {
          page: response.data.pagination?.page || page,
          per_page: response.data.pagination?.limit || perPage,
          total: response.data.pagination?.total || articles.length,
          total_pages: response.data.pagination?.totalPages || 1,
          has_next: response.data.pagination?.hasNext || false,
          has_prev: response.data.pagination?.hasPrev || false
        }
      }
    }
  } catch (error) {
    console.error('Error searching articles:', error)
  }
  
  // Fallback to mock data
  const searchResults = mockArticles.filter(article =>
    article.title.toLowerCase().includes(query.toLowerCase()) ||
    article.excerpt.toLowerCase().includes(query.toLowerCase()) ||
    article.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
  )

  const startIndex = (page - 1) * perPage
  const endIndex = startIndex + perPage
  const paginatedResults = searchResults.slice(startIndex, endIndex)

  return {
    articles: paginatedResults,
    pagination: {
      page,
      per_page: perPage,
      total: searchResults.length,
      total_pages: Math.ceil(searchResults.length / perPage),
      has_next: endIndex < searchResults.length,
      has_prev: page > 1
    }
  }
}

export async function fetchCategories() {
  try {
    const response = await categoriesAPI.getAll()
    
    if (response.success && response.data) {
      return response.data.map(category => ({
        id: category._id,
        name: category.name,
        slug: category.slug,
        description: category.description || '',
        article_count: category.articleCount || 0,
        color: category.color || '#3b82f6',
        icon: category.icon || '📰'
      }))
    }
  } catch (error) {
    console.error('Error fetching categories:', error)
  }
  
  // Fallback to mock data
  return [
    {
      id: "national",
      name: "National",
      slug: "national",
      description: "Latest national politics and governance news",
      article_count: 156,
      color: "#ff6b35",
      icon: "flag"
    },
    {
      id: "cricket",
      name: "Cricket",
      slug: "cricket",
      description: "Cricket news, scores, and analysis",
      article_count: 89,
      color: "#1a365d",
      icon: "sports"
    },
    {
      id: "bollywood",
      name: "Bollywood",
      slug: "bollywood", 
      description: "Entertainment news and celebrity updates",
      article_count: 124,
      color: "#e53e3e",
      icon: "film"
    },
    {
      id: "economy",
      name: "Economy",
      slug: "economy",
      description: "Financial markets, business, and economic news",
      article_count: 78,
      color: "#38a169",
      icon: "chart-line"
    },
    {
      id: "regional",
      name: "Regional",
      slug: "regional",
      description: "State-wise news and regional developments",
      article_count: 112,
      color: "#3182ce",
      icon: "map"
    },
    {
      id: "science",
      name: "Science & Tech",
      slug: "science",
      description: "Scientific discoveries and technology updates",
      article_count: 45,
      color: "#805ad5",
      icon: "atom"
    }
  ]
}

// New data fetching functions for enhanced features

export async function fetchTrendingTopics() {
  try {
    const response = await trendingAPI.getTopics()
    if (response.success && response.data) {
      return response.data
    }
  } catch (error) {
    console.error('Error fetching trending topics:', error)
  }
  
  // Fallback to mock data
  return mockTrendingTopics
}

export async function fetchLiveUpdates() {
  try {
    const response = await trendingAPI.getLiveUpdates()
    if (response.success && response.data) {
      return response.data
    }
  } catch (error) {
    console.error('Error fetching live updates:', error)
  }
  
  // Fallback to mock data
  return mockLiveUpdates
}

export async function fetchStockData() {
  try {
    const response = await trendingAPI.getStocks()
    if (response.success && response.data) {
      return response.data
    }
  } catch (error) {
    console.error('Error fetching stock data:', error)
  }
  
  // Fallback to mock data
  return mockStockData
}

export async function fetchWeatherByCity(city = 'delhi') {
  try {
    const response = await weatherAPI.getByCity(city)
    if (response.success && response.data) {
      return response.data
    }
  } catch (error) {
    console.error('Error fetching weather by city:', error)
  }
  
  // Fallback to mock data
  return mockWeatherData[city.toLowerCase()] || mockWeatherData.delhi
}

export async function fetchAllWeatherData() {
  try {
    const response = await weatherAPI.getAll()
    if (response.success && response.data) {
      return response.data
    }
  } catch (error) {
    console.error('Error fetching all weather data:', error)
  }
  
  // Fallback to mock data
  return mockWeatherData
}

export async function fetchArticlesByRegion(region, page = 1, perPage = 10) {
  await new Promise(resolve => setTimeout(resolve, 600))
  
  const filteredArticles = mockArticles.filter(a => a.region === region)
  const startIndex = (page - 1) * perPage
  const endIndex = startIndex + perPage
  const paginatedArticles = filteredArticles.slice(startIndex, endIndex)

  return {
    articles: paginatedArticles,
    pagination: {
      page,
      per_page: perPage,
      total: filteredArticles.length,
      total_pages: Math.ceil(filteredArticles.length / perPage),
      has_next: endIndex < filteredArticles.length,
      has_prev: page > 1
    }
  }
}

export async function fetchPopularArticles(limit = 5) {
  try {
    const response = await articlesAPI.getAll({ 
      sortBy: '-views', 
      limit,
      status: 'published' 
    })
    
    if (response.success && response.data?.articles) {
      return response.data.articles.map(article => ({
        id: article._id,
        title: article.title,
        slug: article.slug,
        excerpt: article.excerpt,
        author: article.author?.name || 'Unknown',
        category: article.category?.name || 'Uncategorized',
        published_at: article.publishedAt || article.createdAt,
        image: article.image,
        reading_time: article.readingTime || 5,
        views: article.views || 0
      }))
    }
  } catch (error) {
    console.error('Error fetching popular articles:', error)
  }
  
  // Fallback to mock data
  const sortedByViews = [...mockArticles]
    .sort((a, b) => b.views - a.views)
    .slice(0, limit)
  
  return sortedByViews
}

export async function fetchRelatedArticles(articleId, limit = 3) {
  // For now, return similar articles from the same category
  // The backend would need a specific related articles endpoint for better results
  try {
    const response = await articlesAPI.getAll({ 
      limit,
      status: 'published',
      sortBy: '-views'
    })
    
    if (response.success && response.data?.articles) {
      return response.data.articles.slice(0, limit).map(article => ({
        id: article._id,
        title: article.title,
        slug: article.slug,
        excerpt: article.excerpt,
        image: article.image,
        reading_time: article.readingTime || 5
      }))
    }
  } catch (error) {
    console.error('Error fetching related articles:', error)
  }
  
  // Fallback to mock data
  const article = mockArticles.find(a => a.id === articleId)
  if (!article) return []
  
  return mockArticles
    .filter(a => article.related_ids && article.related_ids.includes(a.id))
    .slice(0, limit)
}
