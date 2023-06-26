import { createRandomId } from '../utils/utils'
import axios from 'axios'
import Students from '../models/studentModel'
import e from 'express'

interface CurrentData {
  github: string
  imageFull: string
  name: string
  linkedin: string
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
  github: string
  image_full: string
  name: string
  email: string
  linkedin: string
  uid: string
  user_slug: string
  prev_title: string
  created_by: string
  inspiration: string
  most_important_skill: string
  why_boca_code: string
  project_title: string
  project: string
  project_about: string
  project_image: string
  resume: string
  about: string
  doc_id: string
  enabled: boolean
  modified_by: string
}

function migrateData(currentData: CurrentData) {
  const migratedData: MigratedData = {
    github: currentData.github,
    image_full: currentData.imageFull,
    name: currentData.name,
    email: 'migration_script@bocacode.com',
    linkedin: currentData.linkedin,
    uid: createRandomId().toString(),
    user_slug: currentData.userSlug,
    prev_title: currentData.prevTitle,
    created_by: 'migration_script@bocacode.com',
    inspiration: currentData.inspiration,
    most_important_skill: currentData.mostImportantSkill,
    why_boca_code: currentData.whyBocaCode,
    project_title: currentData.projectTitle,
    project: currentData.project,
    project_about: currentData.projectAbout,
    project_image: currentData.projectImage,
    resume: currentData.resume,
    about: currentData.about,
    doc_id: currentData.docId,
    modified_by: 'migration_script@bocacode.com',
    enabled: true,
  }
  return migratedData
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

async function downloadData(url: string): Promise<CurrentData[]> {
  try {
    const response = await axios.get(url)
    const data: CurrentData[] = await response.data
    return data
  } catch (error) {
    throw new Error(`Failed to fetch data from ${url}. Error: ${error}`)
  }
}

// 2. loop through the data and call the migrateData function for each student
const url = 'https://bocacode-api.web.app/candidates'
downloadData(url)
  .then(async (data) => {
    const studentsData = data as CurrentData[]
    for (const student of studentsData) {
      const migratedData = migrateData(student)
      // console.log(migratedData)
      try {
        await Students.create(migratedData)
      } catch (error) {
        console.error(error)
      }
    }
  })
  .catch((error) => {
    console.error(error)
  })
