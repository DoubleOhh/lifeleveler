def generate_tasks_for_goal(goal_title: str):
    title = goal_title.lower()

    if "swe" in title or "software" in title or "interview" in title:
        return [
            {
                "title": "Solve one easy array problem",
                "description": "Practice one beginner-friendly array or hash map problem.",
                "difficulty": "easy",
                "xp_value": 20,
                "estimated_minutes": 30,
            },
            {
                "title": "Read one section about REST APIs",
                "description": "Focus on request methods, status codes, and client-server basics.",
                "difficulty": "easy",
                "xp_value": 15,
                "estimated_minutes": 20,
            },
            {
                "title": "Write one STAR story about a technical project",
                "description": "Prepare one behavioral interview answer using a real project.",
                "difficulty": "medium",
                "xp_value": 25,
                "estimated_minutes": 25,
            },
        ]

    return [
        {
            "title": f"Spend 20 minutes working toward: {goal_title}",
            "description": "Make one small step toward this goal today.",
            "difficulty": "easy",
            "xp_value": 15,
            "estimated_minutes": 20,
        }
    ]