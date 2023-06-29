import { Component } from "react";

class ErrorBoundary extends  Component{
    state = {
        error: false
    }

// Статический метод обновляет состояние setState який працює только з помилкою
//  static getDerivedStateFromError(error){
//     return {error: true};
//  }

 componentDidCatch(error, eroorInfo){
    console.log(error, eroorInfo);
    this.setState({
        error: true
    })
 }

 render(){
    if (this.state.error){
        return <h2>Помилка у процесі виконання. Дивись консоль.</h2>
    }

    return this.props.children;

 }
}

export default ErrorBoundary;
