export interface Project {
	slug: string;
	title: string;
	description: string;
	longDescription: string;
	tags: string[];
	status: 'Completed' | 'In Progress' | 'Archived';
	date: string;
	role: string;
	website?: string;
	github?: string;
	features: string[];
}

export const projects: Project[] = [
	{
		slug: 'diabetic-retinopathy-detection',
		title: 'Diabetic Retinopathy Detection',
		description: 'Ensemble deep learning model (VGG19, ResNet50, DenseNet121, DenseNet169) on the APTOS 2019 dataset for automated retinal disease grading.',
		longDescription: 'Built an ensemble deep learning model combining VGG19, ResNet50, DenseNet121, and DenseNet169 architectures on the APTOS 2019 dataset. Achieved superior accuracy through class balancing, hyperparameter tuning, and comparative benchmarking across all model variants.',
		tags: ['Python', 'Deep Learning', 'CNNs', 'TensorFlow'],
		status: 'Completed',
		date: 'Jul 2023 – Apr 2024',
		role: 'ML Engineer',
		features: [
			'Ensemble of VGG19, ResNet50, DenseNet121, DenseNet169',
			'APTOS 2019 dataset with class balancing',
			'Hyperparameter tuning & comparative benchmarking',
			'Automated 5-class retinopathy grading',
		],
	},
	{
		slug: 'brain-tumor-detection',
		title: 'Brain Tumor Detection using CNNs',
		description: 'Convolutional Neural Network to automate detection and localization of brain tumors in MRI scans, improving diagnostic efficiency.',
		longDescription: 'Implemented a Convolutional Neural Network (CNN) to automate detection and localization of brain tumors in MRI scans. The model significantly improves diagnostic efficiency by providing accurate tumor localization to assist radiologists.',
		tags: ['Python', 'CNNs', 'OpenCV', 'Keras'],
		status: 'Completed',
		date: 'Dec 2022 – Mar 2023',
		role: 'ML Engineer',
		features: [
			'CNN-based tumor detection in MRI scans',
			'Automated tumor localization',
			'Improved diagnostic efficiency',
			'Binary & multi-class classification',
		],
	},
	{
		slug: 'smartphone-price-prediction',
		title: 'Smartphone Price Prediction & Baggage Tracking',
		description: 'Regression-based ML model for smartphone price prediction combined with a real-time baggage tracking solution for airport luggage monitoring.',
		longDescription: 'Built a regression-based ML model for smartphone price prediction using feature engineering on hardware specs. Also developed a real-time baggage tracking solution to enhance airport luggage monitoring with live status updates.',
		tags: ['Python', 'Machine Learning', 'Flask', 'SQL'],
		status: 'Completed',
		date: 'Jul 2022 – Nov 2022',
		role: 'Full Stack ML Developer',
		features: [
			'Regression model for price prediction',
			'Feature engineering on hardware specs',
			'Real-time baggage tracking system',
			'Airport luggage monitoring dashboard',
		],
	},
	{
		slug: 'zoho-catalyst-hackathon',
		title: 'Complaint Registration Portal',
		description: 'Flask-based complaint registration portal with user authentication and admin management, built for the Zoho Catalyst Hackathon.',
		longDescription: 'Developed a full-featured complaint registration portal using Flask for the Zoho Catalyst Hackathon. Includes user authentication, role-based admin management, complaint tracking, and status updates.',
		tags: ['Python', 'Flask', 'SQL', 'HTML/CSS'],
		status: 'Completed',
		date: 'Sep 2022',
		role: 'Full Stack Developer',
		features: [
			'User authentication & session management',
			'Admin dashboard for complaint management',
			'Complaint status tracking',
			'Role-based access control',
		],
	},
];
