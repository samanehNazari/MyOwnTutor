module.exports = (dbHandler) =>  {
    return {
        create: async ({ title, userId, courseId, place }) => {
            if (!dbHandler.create) throw new Error('db handler must have property create');
            if (!place) place = 1;
            return dbHandler.create({ title, userId, courseId, place });
        },
        /* @args
            - options : object
                - title
                - userId
                - courseId
        */
        get: async (options) => {
            // validation
            if (!dbHandler.get) throw new Error('dbHandler must have property get');
            return dbHandler.get(options);
        },
        assign: async (courseId, sectionId) => {
            if (!dbHandler.assign) throw new Error('dbHandler must have a property of assign');
            return dbHandler.assign(courseId, sectionId);
        },
        getQuestions: async (id) => {
            if (!dbHandler.getQuestions) throw new Error('dbHandler must have getQuestions property');
            if (!id) throw new Error('arg error: getQuestions expects id argument');
            return dbHandler.getQuestions(id);
        },
        getVideos: async (id) => {
            if (!dbHandler.getVideos) throw new Error('dbHandler must have getVideos property');
            if (!id) throw new Error('arg error: getQuestions expects id argument');
            return dbHandler.getVideos(id);
        },
        assignVideo: async (sectionId, videoId) =>{
            if (!dbHandler.assignVideo) throw new Error('dbHandler must have property assignVideo');
            if (!sectionId) throw new Error('arg error: sectionId must be defined');
            if (!videoId) throw new Error('arg error: videoId must be defined');
            return dbHandler.assignVideo(sectionId, videoId);
        },
        assignQuestion: async (sectionId, questionId) =>{
            if (!dbHandler.assignQuestion) throw new Error('dbHandler must have property assignQuestion');
            if (!sectionId) throw new Error('arg error: sectionId must be defined');
            if (!questionId) throw new Error('arg error: questionId must be defined');
            return dbHandler.assignQuestion(sectionId, questionId);
        },
        updatePlace: async (sectionId, place, courseId) => {
            if (!courseId) {
                const assignment = await dbHandler.getCourseAssignment(sectionId);
                if (assignment.length > 1) throw new Error('This section is assigned to multiple courses. Please provide courseId option');
                if (assignment[0]) courseId = assignment[0].course_id;
            }
            // prevent entry of a place above the max value of the highest place
            let max = await dbHandler.getCourseMaxSection(courseId);
            if (!max) max = 1;
            if (place > max + 1) place = max + 1;
            return dbHandler.updatePlace(sectionId, place, courseId);
        },
    };
};
