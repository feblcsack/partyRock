// src/services/projectService.js
import { 
    collection, 
    addDoc, 
    updateDoc, 
    deleteDoc, 
    doc, 
    getDocs, 
    query, 
    where,
    serverTimestamp 
  } from 'firebase/firestore';
  import { db } from '../config/firebase';
  
  const PROJECTS_COLLECTION = 'projects';
  
  // Get all projects
  export const getAllProjects = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, PROJECTS_COLLECTION));
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error getting projects:', error);
      throw error;
    }
  };
  
  // Get projects by user
  export const getProjectsByUser = async (userId) => {
    try {
      const q = query(
        collection(db, PROJECTS_COLLECTION), 
        where('userId', '==', userId)
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error getting user projects:', error);
      throw error;
    }
  };
  
  // Add new project
  export const addProject = async (projectData, userId, userName) => {
    try {
      const docRef = await addDoc(collection(db, PROJECTS_COLLECTION), {
        ...projectData,
        userId,
        userName,
        scores: null,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      return docRef.id;
    } catch (error) {
      console.error('Error adding project:', error);
      throw error;
    }
  };
  
  // Update project scores
  export const updateProjectScores = async (projectId, scores) => {
    try {
      const projectRef = doc(db, PROJECTS_COLLECTION, projectId);
      await updateDoc(projectRef, {
        scores,
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      console.error('Error updating project scores:', error);
      throw error;
    }
  };
  
  // Delete project
  export const deleteProject = async (projectId) => {
    try {
      await deleteDoc(doc(db, PROJECTS_COLLECTION, projectId));
    } catch (error) {
      console.error('Error deleting project:', error);
      throw error;
    }
  };