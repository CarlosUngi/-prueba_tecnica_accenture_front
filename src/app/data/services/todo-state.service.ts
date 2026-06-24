import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Task } from '../../core/models/task.model';
import { Category } from '../../core/models/category.model';

@Injectable({
    providedIn: 'root'
})
export class TodoStateService {
    private tasksSubject = new BehaviorSubject<Task[]>([]);
    private categoriesSubject = new BehaviorSubject<Category[]>([]);

    tasks$: Observable<Task[]> = this.tasksSubject.asObservable();
    categories$: Observable<Category[]> = this.categoriesSubject.asObservable();

    constructor() {
        this.initMockData();
    }

    private initMockData() {
        const initialCategories: Category[] = [
            { id: 'cat-1', name: 'Trabajo', color: 'medium', createdAt: new Date() },
            { id: 'cat-2', name: 'Personal', color: 'success', createdAt: new Date() },
            { id: 'cat-3', name: 'Urgente', color: 'danger', createdAt: new Date() }
        ];

        const initialTasks: Task[] = [
            { id: 'task-1', title: 'Revisar requerimientos de Accenture', isCompleted: true, categoryId: 'cat-1', createdAt: new Date() },
            { id: 'task-2', title: 'Implementar almacenamiento local con RxJS', isCompleted: false, categoryId: 'cat-1', createdAt: new Date() },
            { id: 'task-3', title: 'Comprar café especial', isCompleted: false, categoryId: 'cat-2', createdAt: new Date() }
        ];

        this.categoriesSubject.next(initialCategories);
        this.tasksSubject.next(initialTasks);
    }

    addTask(title: string, categoryId?: string) {
        const currentTasks = this.tasksSubject.value;
        const newTask: Task = {
            id: 'task-' + Date.now(),
            title: title.trim(),
            isCompleted: false,
            categoryId: categoryId || undefined,
            createdAt: new Date()
        };
        this.tasksSubject.next([...currentTasks, newTask]);
    }

    toggleTaskStatus(taskId: string) {
        const updatedTasks = this.tasksSubject.value.map(task => {
            if (task.id === taskId) {
                return { ...task, isCompleted: !task.isCompleted };
            }
            return task;
        });
        this.tasksSubject.next(updatedTasks);
    }

    deleteTask(taskId: string) {
        const currentTasks = this.tasksSubject.value;
        this.tasksSubject.next(currentTasks.filter(task => task.id !== taskId));
    }

    addCategory(name: string, color: string) {
        const currentCategories = this.categoriesSubject.value;
        const newCategory: Category = {
            id: 'cat-' + Date.now(),
            name: name.trim(),
            color: color,
            createdAt: new Date()
        };
        this.categoriesSubject.next([...currentCategories, newCategory]);
    }

    deleteCategory(categoryId: string) {
        const currentCategories = this.categoriesSubject.value;
        this.categoriesSubject.next(currentCategories.filter(cat => cat.id !== categoryId));

        const updatedTasks = this.tasksSubject.value.map(task => {
            if (task.categoryId === categoryId) {
                return { ...task, categoryId: undefined };
            }
            return task;
        });
        this.tasksSubject.next(updatedTasks);
    }
}