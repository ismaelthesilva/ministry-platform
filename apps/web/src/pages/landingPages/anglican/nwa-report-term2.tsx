import React from "react";
import { Card, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, Sparkles, Trophy, Heart, PartyPopper, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const stats = [
	{
		label: "Youth on our list",
		value: 60,
		color: "bg-blue-500",
		icon: <Users className="h-6 w-6 text-white" />,
		description: "Total youth registered this term",
	},
	{
		label: "Attended at least once",
		value: 50,
		color: "bg-green-500",
		icon: <PartyPopper className="h-6 w-6 text-white" />,
	},
	{
		label: "Regulars this term",
		value: 31,
		color: "bg-purple-500",
		icon: <Sparkles className="h-6 w-6 text-white" />,
	},
	{
		label: "Average per night",
		value: "15–20",
		color: "bg-pink-500",
		icon: <Heart className="h-6 w-6 text-white" />,
	},
];

const MedalBadges = () => (
	<div className="flex gap-2 mt-2">
		<span
			title="Gold Medal"
			className="inline-flex items-center px-2 py-1 rounded-full bg-yellow-400 text-yellow-900 font-semibold text-xs shadow"
		>
			{" "}
			🥇 2 Gold
		</span>
		<span
			title="Silver Medal"
			className="inline-flex items-center px-2 py-1 rounded-full bg-gray-300 text-gray-800 font-semibold text-xs shadow"
		>
			{" "}
			🥈 1 Silver
		</span>
		<span
			title="Bronze Medal"
			className="inline-flex items-center px-2 py-1 rounded-full bg-amber-700 text-amber-100 font-semibold text-xs shadow"
		>
			{" "}
			🥉 1 Bronze
		</span>
	</div>
);

const NwaReportTerm2: React.FC = () => (
	<div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex flex-col items-center py-8 px-2">
		<div className="w-full max-w-3xl">
			<Link to="/nwayouth">
				<Button variant="ghost" className="mb-4 flex items-center gap-2">
					<ArrowLeft className="h-5 w-5" />
					Back to Youth Page
				</Button>
			</Link>
			<div className="text-center mb-8">
				<div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full mb-6 shadow-lg">
					<Sparkles className="h-10 w-10 text-white" />
				</div>
				<h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-2 tracking-tight">
					A Term Full of{" "}
					<span className="text-pink-600">God’s Goodness</span>
				</h1>
				<Badge className="bg-blue-500 text-white text-base px-4 py-2 mb-2">
					Term 2 Youth Report
				</Badge>
				<p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto mt-4">
					From eFest to youth nights, this term was packed with joy, learning, and
					moments where God’s love shone brightly.
				</p>
			</div>

			{/* Stats Section */}
			<div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
				{stats.map((stat, idx) => (
					<Card
						key={idx}
						className="flex flex-row items-center gap-4 shadow-lg border-0 bg-white/80 dark:bg-gray-800"
					>
						<div
							className={`flex items-center justify-center w-16 h-16 rounded-full ${stat.color} shadow`}
						>
							{stat.icon}
						</div>
						<CardContent className="flex-1 py-4">
							<CardTitle className="text-3xl font-bold text-gray-900 dark:text-white">
								{stat.value}
							</CardTitle>
							<CardDescription className="text-gray-600 dark:text-gray-300">
								{stat.label}
							</CardDescription>
							{stat.description && (
								<div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
									{stat.description}
								</div>
							)}
						</CardContent>
					</Card>
				))}
				<Card className="flex flex-col items-center justify-center shadow-lg border-0 bg-white/80 dark:bg-gray-800 col-span-1 sm:col-span-2">
					<div className="flex items-center gap-2 mt-4">
						<Trophy className="h-8 w-8 text-yellow-500" />
						<span className="text-xl font-bold text-yellow-700 dark:text-yellow-300">
							Fanatics Cup
						</span>
					</div>
					<CardContent className="flex flex-col items-center py-4">
						<div className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
							4 Finals
						</div>
						<div className="text-sm text-gray-600 dark:text-gray-300 mb-2">
							Made 3, missed 1 (counting error)
						</div>
						<MedalBadges />
						<div className="mt-2 text-xs text-gray-500 dark:text-gray-400 italic">
							“More than medals, we brought home memories, faith, and friendship.”
						</div>
					</CardContent>
				</Card>
			</div>

			{/* Narrative Section */}
			<Card className="mb-10 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-gray-800 dark:to-gray-900 border-0 shadow-none">
				<CardContent className="py-8">
					<h2 className="text-2xl font-bold mb-4 text-purple-700 dark:text-purple-300">
						Kia ora whānau,
					</h2>
					<p className="mb-4 text-gray-700 dark:text-gray-200">
						What a term it’s been! From the buzz of <b>eFest</b> to our Youth
						Services and challenge games, this past season has been packed with
						joy, learning, and moments where God’s love has shone brightly.
					</p>
					<p className="mb-4 text-gray-700 dark:text-gray-200">
						At <b>eFest</b>, our rangatahi played hard, laughed loud, and reflected deeply on what Jesus did for us at the cross. We didn’t just come home as <b>Fanatics Cup</b> competitors—we made it to <b>4 finals</b> (competed in 3, missed 1 for a counting error), and God blessed us with <b>2 gold, 1 silver, and 1 bronze</b> medals.
						<br />
						<span className="block mt-2">
							<MedalBadges />
						</span>
						<span className="block mt-2 text-sm text-gray-600 dark:text-gray-400 italic">
							More than medals, we returned with hearts full, friendships strengthened, and stories of faith written together.
						</span>
					</p>
					<p className="mb-4 text-gray-700 dark:text-gray-200">
						Our series on the <b>Beatitudes</b> helped us learn what it means to
						truly follow Jesus. These weren’t just lessons—they were life-shaping
						truths that our young people are carrying into their daily lives.
					</p>
					<p className="mb-4 text-gray-700 dark:text-gray-200">
						Despite the colds and changing weather, youth nights have been alive
						with energy. Most weeks, we’ve welcomed <b>15–20 teens</b>, many
						bringing new friends along. Out of the <b>60</b> on our list, over
						<b>50</b> have come at least once, and <b>31</b> are attending more
						regularly. That’s something to celebrate!
					</p>
					<p className="mb-4 text-gray-700 dark:text-gray-200">
						We’re also planting seeds to grow our young adults group as we
						navigate the ever-changing rhythms of city life after school.
					</p>
					<p className="mb-4 text-gray-700 dark:text-gray-200">
						Our heart remains simple: to have fun, build real relationships, and
						grow in God’s grace. We’re always encouraging our youth to be part
						of this journey—to come, serve, and invite others to follow Jesus.
					</p>
					<p className="mb-4 text-gray-700 dark:text-gray-200">
						A huge mihi to our church leaders, parents, helpers, and generous
						donors. A special shout-out to Daniel—faithful, gifted, and a true
						blessing to our team. Thank you all for investing in the next
						generation. We praise God for His goodness and favour over our
						youth.
					</p>
					<div className="mt-6 text-right">
						<span className="block font-semibold text-gray-800 dark:text-gray-100">
							Shalom & blessings,
						</span>
						<span className="block text-gray-700 dark:text-gray-300">
							Ismael Silva
							<br />
							Youth Pastor
						</span>
						<span className="block text-xs text-gray-500 dark:text-gray-400 mt-2 italic">
							“May the Lord continue to guide, protect, and inspire our youth as they shine for Him.”
						</span>
					</div>
				</CardContent>
			</Card>

			{/* Call to Action */}
			<div className="text-center mt-8">
				<Link to="/nwayouth">
					<Button size="lg" className="bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg hover:from-pink-600 hover:to-purple-700">
						Back to NWAY Youth
					</Button>
				</Link>
			</div>
		</div>
	</div>
);

export default NwaReportTerm2;