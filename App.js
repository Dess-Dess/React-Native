import React, {useState} from 'react'
import { StyleSheet, Text, View , FlatList} from 'react-native'
import { Navbar } from './src/Navbar'
import { AddTodo } from './src/AddTodo'
import { ToDoItem } from './src/ToDoItem'

export default function App() {

  const [todoList, setTodos] = useState([])

  const addTodo = (title) =>{
    
    const newTodo = {
      id: Date.now().toString(),
      title: title
    }

    setTodos((prevtodoList) =>{
      return[
        ...prevtodoList,
        newTodo
      ]
    })

  }

  const removeTodoItem = id =>{
    setTodos(prevtodoList => prevtodoList.filter(todo => todo.id !== id))
  }

  return (
    <View>
      <Navbar title="Todo App"></Navbar>
      <View style={styles.container}>
        <AddTodo onSubmit={addTodo} />

        <FlatList
          keyExtractor = {item => item.id}
          data = {todoList}
          renderItem = {({item})=>
            <ToDoItem todo={item} onRemove = {removeTodoItem}/>
          }
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding:10
  }
});
