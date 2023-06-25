import { createRandomId } from '../utils/utils'
import axios from 'axios'
import Students from '../models/studentModel'

interface CurrentData {
  github: string
  imageFull: string
  name: string
  id: number
  userSlug: string
  prevTitle: string
  inspiration: string
  mostImportantSkill: string
  whyBocaCode: string
  projectTitle: string
  project: string
  projectAbout: string
  projectImage: string
  resume: string
  about: string
  docId: string
}

interface MigratedData {
  github: { type: string; required: true }
  image_full: { type: string; required: true }
  name: { type: string; required: true }
  email: { type: string; required: true }
  linkedin: { type: string; required: true }
  uid: { type: string; required: true }
  user_slug: { type: string; required: true }
  prev_title: { type: string; required: true }
  created_by: { type: string; required: true }
  inspiration: { type: string; required: true }
  most_important_skill: { type: string; required: true }
  why_boca_code: { type: string; required: true }
  project_title: { type: string; required: true }
  project: { type: string; required: true }
  project_about: { type: string; required: true }
  project_image: { type: string; required: true }
  resume: { type: string; required: true }
  about: { type: string; required: true }
  doc_id: { type: string; required: true }
  enabled: { type: boolean; required: true; default: true }
  modified_by: { type: string }
}

async function migrateData(currentData: CurrentData) {
  const migratedData: MigratedData = {
    github: { type: 'String', required: true },
    image_full: { type: 'String', required: true },
    name: { type: 'String', required: true },
    email: { type: 'String', required: true },
    linkedin: { type: 'String', required: true },
    uid: { type: 'String', required: true },
    user_slug: { type: 'String', required: true },
    prev_title: { type: 'String', required: true },
    created_by: { type: 'String', required: true },
    inspiration: { type: 'String', required: true },
    most_important_skill: { type: 'String', required: true },
    why_boca_code: { type: 'String', required: true },
    project_title: { type: 'String', required: true },
    project: { type: 'String', required: true },
    project_about: { type: 'String', required: true },
    project_image: { type: 'String', required: true },
    resume: { type: 'String', required: true },
    about: { type: 'String', required: true },
    doc_id: { type: 'String', required: true },
    enabled: { type: true, required: true, default: true },
    modified_by: { type: 'String' },
  }

  migratedData.github.type = currentData.github
  migratedData.image_full.type = currentData.imageFull
  migratedData.name.type = currentData.name
  migratedData.email.type = 'migration_script@bocacode.com'
  migratedData.uid.type = createRandomId().toString()
  migratedData.user_slug.type = currentData.userSlug
  migratedData.prev_title.type = currentData.prevTitle
  migratedData.created_by.type = 'migration_script@bocacode.com'
  migratedData.inspiration.type = currentData.inspiration
  migratedData.most_important_skill.type = currentData.mostImportantSkill
  migratedData.why_boca_code.type = currentData.whyBocaCode
  migratedData.project_title.type = currentData.projectTitle
  migratedData.project.type = currentData.project
  migratedData.project_about.type = currentData.projectAbout
  migratedData.project_image.type = currentData.projectImage
  migratedData.resume.type = currentData.resume
  migratedData.about.type = currentData.about
  migratedData.doc_id.type = currentData.docId
  migratedData.modified_by.type = 'migration_script@bocacode.com'

  //   return migratedData
  await Students.create(migratedData)
}

// Usage example
// const currentData: CurrentData = {
//   github: 'https://github.com/VeronicaDFL',
//   imageFull: '/assets/images/',
//   name: 'Veronica de Felice',
//   id: 1017,
//   userSlug: 'veronica-de-felice',
//   prevTitle: 'Former Marine Canvas Designer',
//   inspiration: 'Upon completing school,',
//   mostImportantSkill: 'I believe that ',
//   whyBocaCode: 'I chose Boca Code due ',
//   projectTitle: 'BITE-BUSTER',
//   project: 'https://example.com/',
//   projectAbout: 'Introducing',
//   projectImage: 'https://example.com/image.jpg',
//   resume: 'https://example.com/resume.pdf',
//   about: 'I am a ',
//   docId: 'rrbuMPS1W6dVMBrge03L',
// }

// const migratedData: MigratedData = migrateData(currentData)
// console.log(migratedData)

// what I need to do:

// 1. fetch data from https://bocacode-api.web.app/candidates into a json file

async function downloadData(url: string): Promise<CurrentData> {
  try {
    const response = await axios.get(url)
    return response.data
  } catch (error) {
    throw new Error(`Failed to download data from ${url}. Error: ${error}`)
  }
}

// 2. loop through the data and call the migrateData function for each student
const url = 'https://bocacode-api.web.app/candidates'
downloadData(url)
  .then(async (data) => {
    console.log(data)
    // Process the downloaded data
    await migrateData(data)
  })
  .catch((error) => {
    console.error(error)
  })
