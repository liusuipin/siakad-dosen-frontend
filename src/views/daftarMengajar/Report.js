import React, { Component, Fragment } from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

export default class Report extends Component {
    render() {

        const styles = StyleSheet.create({
            page: {
                flexDirection: 'row',
                backgroundColor: '#E4E4E4'
            },
            section: {
                margin: 10,
                padding: 10,
                flexGrow: 1
            }
        });

        return (
            <Fragment>
                <Document>
                    <Page size="A4" style={styles.page}>
                        <View style={styles.section}>
                            <Text>{this.props.kocak}</Text>
                        </View>
                        <View style={styles.section}>
                            <Text>Section #2</Text>
                        </View>
                    </Page>
                </Document>
            </Fragment>
        )
    }
}
