import { Router } from 'express'

const router = Router()

interface User {
    id: number
    githubRepoName: string
}

const getUser = (id:number) => {
    return new Promise<User>((resolve, reject) => {
        setTimeout(() => {
            const user = {id: id, githubRepoName: 'wahaj'}
            resolve(user)
        }, 1000)
    })
}

const getRepo = (githubRepoName: string) => {
    return new Promise<string[]>((resolve, reject) => {
        setTimeout(() => {
            const repos = ['Repo1', 'Repo2', 'Repo3', 'Repo4', 'Repo5']
            resolve(repos)
        }, 1000)
    })
}

const getCommits = (repo: string) => {
    return new Promise<string[]>((resolve, reject) => {
        setTimeout(() => {
            const commits = ['commit 7890', 'commit 6721', 'commit 4789', 'commit 1092', 'commit 9760']
            resolve(commits)
        }, 1000);
    })
}

router.get('/', (req, response) => {

    getUser(1)
      .then(user => getRepo(user.githubRepoName))
      .then(repos => getCommits(repos[0]))
      .then(commits => response.status(200).send(commits.join(', ')))
})

export default router


// TryCatch Vs AsyncAwait
// router.put(`${baseURL}:id`, async (req: Request, res: Response) => {
//     try {
//         validateReminder(req.body)
//         const reminder: ReminderDTO | null = await Reminder.findByIdAndUpdate(req.params.id, { title: req.body.title }, { new: true })
//         res.status(204).json(reminder)
//     }
//     catch (error) {
//         if (error instanceof ZodError) res.status(422).send({error: error.errors[0].message})
//         else res.status(500).send({error: Error500})
//     }

//     validateReminder(req.body)
//     await Reminder.findByIdAndUpdate(req.params.id, { title: req.body.title }, { new: true })
//         .then(result => res.status(204).json(result))
//         .catch(error => (error instanceof ZodError)  ?  (res.status(422).send({error: error.errors[0].message})) :  (res.status(500).send({error: Error500})) )

// })