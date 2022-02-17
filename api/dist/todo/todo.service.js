"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const todo_entity_1 = require("./entities/todo.entity");
const folder_entity_1 = require("../folder/entities/folder.entity");
let TodoService = class TodoService {
    constructor(todosRepository, foldersRepository) {
        this.todosRepository = todosRepository;
        this.foldersRepository = foldersRepository;
    }
    getAll() {
        return this.todosRepository.find({ relations: ['folder'] });
    }
    async findOne(id) {
        try {
            const todo = await this.todosRepository.findOneOrFail(id);
            return todo;
        }
        catch (e) {
            throw e;
        }
    }
    async create(createTodoDto) {
        const newTodo = this.todosRepository.create({
            name: createTodoDto.name
        });
        if (createTodoDto.folderId) {
            const folder = await this.foldersRepository.findOneOrFail(createTodoDto.folderId);
            newTodo.folder = folder;
        }
        await this.todosRepository.save(newTodo);
        return newTodo;
    }
    async update(id, body) {
        const todo = await this.findOne(id);
        if (body.name)
            todo.name = body.name;
        if (body.completed)
            todo.completed = !todo.completed;
        return this.todosRepository.save(todo);
    }
    async remove(id) {
        const todo = await this.findOne(id);
        return await this.todosRepository.remove(todo);
    }
};
TodoService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(todo_entity_1.Todo)),
    __param(1, (0, typeorm_1.InjectRepository)(folder_entity_1.Folder)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], TodoService);
exports.TodoService = TodoService;
//# sourceMappingURL=todo.service.js.map