import React, { Component } from 'react';
import { FlatList, View, StyleSheet } from 'react-native';

import AddTodo from '../components/AddTodo';
import TodoListItem from '../components/TodoListItem';
import TodoService from '../realm/service/todoService'
import Color from '../constants/Color'


class TodoList extends Component {

    static navigationOptions = {
        title: 'Todos',
    };

    state = {
        todoList: null,
    }

    componentDidMount(){
        this.setState({
            todoList: TodoService.findall(),
        });
    }

    refresh() {
        // this.state.todoList = TodoService.findall();
        // possiblity of recurisve calls
        this.setState({
            todoList: TodoService.findall()
        })
    }

    updateTodoList = (todoList) => {
        this.setState({
            todoList: todoList
        });
    }

    deleteTodo = (todo) => {
        TodoService.delete(todo);
        this.updateTodoList(this.state.todoList);
        // this.setState({
        //     todoList: TodoService.findall()
        // });
    }

    showDetail = (todo) => {
        this.props.navigation.navigate('Detail', {
            todo,
        });
    }

    render() {
        const isSaved = this.props.navigation.getParam('isSaved', false);

        if (isSaved) {
            this.refresh();
        }

        return (
            <View style={styles.container}>

                <FlatList
                    data={this.state.todoList}
                    renderItem={({ item }) =>
                        <TodoListItem
                            todo={item}
                            onDeleteTodo={this.deleteTodo}
                            onShowDetail={this.showDetail}
                        />
                    }
                    keyExtractor={(item) => item.id.toString()}
                />

                <View style={{ backgroundColor: Color.VERY_LIGHT_GREY }}>
                    <AddTodo
                        updateTodoList={this.updateTodoList}
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: Color.WHITE,
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
        flex: 1
    },
    itemContainer: {
        borderBottomWidth: 1,
        borderBottomColor: Color.GREY,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 4
    }
});

export default TodoList;
