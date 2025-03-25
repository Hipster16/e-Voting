import { BarChart3, CheckCircle, Clock, DollarSign, Eye, Fingerprint, Globe, Lock, ShieldCheck, UserCheck, UserPlus, Users, Vote } from "lucide-react"
import rhon from "./images/rhon.png"
import ritin from "./images/ritin.png"
import vinu from "./images/vinu.png"

export const benefits = [
    {
      icon: ShieldCheck,
      title: "Enhanced Security",
      description:
        "Blockchain technology prevents fraud, tampering, and manipulation of votes through distributed ledger technology and cryptographic verification.",
    },
    {
      icon: Clock,
      title: "Time Efficiency",
      description:
        "Eliminate manual counting and reduce the time needed for result declaration with automated, instant tabulation of votes.",
    },
    {
      icon: DollarSign,
      title: "Cost Reduction",
      description:
        "Significantly lower costs compared to traditional paper-based voting systems by eliminating physical infrastructure and reducing personnel requirements.",
    },
    {
      icon: Users,
      title: "Increased Participation",
      description:
        "Remote voting capabilities increase student voter turnout and engagement by making the process more accessible to all eligible voters.",
    },
    {
      icon: BarChart3,
      title: "Transparent Results",
      description:
        "Real-time counting with complete transparency builds trust in the electoral process while maintaining voter privacy and ballot secrecy.",
    },
    {
      icon: Globe,
      title: "Environmental Impact",
      description:
        "Paperless voting reduces environmental footprint and promotes sustainability by eliminating the need for printed ballots and related materials.",
    },
  ]

export const useCases = [
    {
      title: "Student Government",
      description: "Secure student body elections with immutable records and transparent counting.",
      features: [
        "Student ID verification",
        "Tamper-proof ballot storage",
        "Real-time results tabulation",
        "Reduced electoral fraud",
      ],
    },
    {
      title: "Club Elections",
      description: "Streamline club leadership elections with secure, verifiable processes.",
      features: [
        "Weighted voting capabilities",
        "Role-based voting management",
        "Automated vote counting",
        "Club constitution compliance",
      ],
    },
    {
      title: "Department Representatives",
      description: "Facilitate department representative elections with accessible voting systems.",
      features: [
        "Easy setup and configuration",
        "Mobile-friendly interface",
        "Custom election parameters",
        "Detailed analytics",
      ],
    },
    {
      title: "Campus Referendums",
      description: "Enable fair and transparent decision-making for campus-wide initiatives.",
      features: [
        "Simple user experience",
        "Low-cost implementation",
        "Multiple voting methods",
        "Customizable ballots",
      ],
    },
  ]

export const stats = [
    { value: "99.9%", label: "Uptime" },
    { value: "100x", label: "Faster Results" },
    { value: "70%", label: "Cost Reduction" },
    { value: "0", label: "Fraud Cases" },
  ]

export const features = [
    {
      icon: ShieldCheck,
      title: "Immutable Records",
      description: "Votes are permanently recorded on the blockchain, preventing tampering and ensuring integrity.",
    },
    {
      icon: Lock,
      title: "Zero Knowledge Proofs",
      description: "Verify identity without revealing personal information, maintaining complete privacy.",
    },
    {
      icon: Eye,
      title: "Full Transparency",
      description: "Public ledger allows anyone to verify the voting process without compromising privacy.",
    },
    {
      icon: Clock,
      title: "Real-time Results",
      description: "Instant counting and tabulation with no delays in result declaration.",
    },
    {
      icon: UserCheck,
      title: "Student Verification",
      description: "Secure identity verification prevents duplicate voting and fraud.",
    },
    {
      icon: BarChart3,
      title: "Auditable Trail",
      description: "Complete audit trail for election officials and independent observers.",
    },
    {
      icon: Fingerprint,
      title: "Gasless Transactions",
      description: "No blockchain fees required for students to cast their votes.",
    },
    {
      icon: Globe,
      title: "Remote Accessibility",
      description: "Vote securely from anywhere on campus, increasing participation and accessibility.",
    },
  ]
export const footerLinks = [
    {
      title: "Platform",
      links: [
        { name: "Features", href: "#features" },
        { name: "How It Works", href: "#how-it-works" },
        { name: "Benefits", href: "#benefits" },``
      ],
    },
    {
      title: "Resources",
      links: [
        { name: "Documentation", href: "#docs" },
        { name: "API", href: "#api" },
        { name: "Tutorials", href: "#tutorials" },
        { name: "FAQ", href: "#faq" },
        { name: "Support", href: "#support" },
      ],
    },
    {
      title: "Community",
      links: [
        { name: "About", href: "#about" },
        { name: "Student Success", href: "#success-stories" },
        { name: "Developer Portal", href: "#developers" },
        { name: "Blog", href: "#blog" },
        { name: "Contact", href: "#contact" },
      ],
    },
  ]
export const steps = [
    {
      icon: UserPlus,
      title: "Secure Registration",
      description: "Students register with their college ID and receive a unique cryptographic key pair.",
      details: [
        "College ID verification",
        "Biometric authentication options",
        "Secure key generation and storage",
        "Privacy-preserving identity management",
      ],
    },
    {
      icon: ShieldCheck,
      title: "Zero Knowledge Authentication",
      description: "Verify identity without revealing personal information using Zero Knowledge Proofs.",
      details: [
        "Two-factor authentication",
        "Time-based one-time passwords",
        "Hardware security key support",
        "Anti-fraud detection systems",
      ],
    },
    {
      icon: Vote,
      title: "Cast Your Vote",
      description: "Votes are encrypted and submitted to the blockchain with gasless transactions - no fees required.",
      details: [
        "End-to-end encryption",
        "Zero-knowledge proofs",
        "Tamper-evident ballot casting",
        "Voter receipt generation",
      ],
    },
    {
      icon: CheckCircle,
      title: "Verification",
      description: "Each vote is verified by consensus and permanently recorded on the blockchain.",
      details: [
        "Distributed consensus mechanism",
        "Immutable vote recording",
        "Public verification portal",
        "Real-time result tabulation",
      ],
    },
  ]

export const testimonials = [
    {
      name: "Rhon S George",
      role: "Student",
      organization: "MBCET",
      quote:
        "Amazing",
      avatar: rhon,
      rating: 5,
    },
    {
      name: "Ritin George D",
      role: "Blockchain Ambassador",
      organization: "MBCET",
      quote:"Great!!",
      avatar: ritin,
      rating: 5,
    },
    {
      name: "Vinu B Kurup",
      role: "Blockchain Mentor",
      organization: "MBCET",
      quote:"Fabulous Exquisite",
      avatar: vinu,
      rating: 5,
    }
  ]